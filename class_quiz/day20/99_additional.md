# 💡 크롬 주소창에서 POST 요청이 가능할까?

## ✅ 결론

- **주소창 자체로는 POST/PUT/DELETE 요청을 보낼 수 없다.**
  주소창에 입력해서 발생하는 네비게이션은 본질적으로 **GET**(또는 리디렉션 흐름)이다.
- 하지만 **브라우저는 POST 를 충분히 보낼 수 있다.**
  방법: HTML `<form method="post">`, 페이지 내 JavaScript `fetch`, API 클라이언트(확장 프로그램), 개발자도구, 북마클릿(제한적) 등.

# 💡 Graphql 캐시는 어떻게 되나요?

> 핵심: **GraphQL 자체엔 캐시 규칙이 없다.**  
> **캐시는 “클라이언트 라이브러리(Apollo/Relay/urql/TanStack Query)”가** 각자 방식으로 구현한다.

---

## 0) 왜 캐시가 필요해?

- 같은 데이터를 또 요청하지 않게 해서 **속도↑, 트래픽↓**
- 서버에서 받은 데이터를 **앱 상태처럼** 보관하고, **화면 간 공유/동기화**
- 네트워크가 느리거나 오프라인일 때도 **부드러운 UX** 유지

---

## 1) 캐시의 두 가지 관점

### A. 요청 단위 캐시 (document/query cache)

- “이 **쿼리 문서 + 변수**로 요청했을 때의 결과”를 통째로 저장
- 같은 요청이면 저장된 결과를 재사용
- **장점:** 간단함
- **단점:** 글 하나를 수정해도 **그 글을 포함한 모든 쿼리**를 자동 갱신하기 어려움

> 예: TanStack Query(React Query)는 **쿼리 키 기반**으로 캐시함.  
> 엔티티 단위 정규화는 기본 제공하지 않고, 보통 **invalidateQueries**로 갱신을 트리거함.

### B. 엔티티 정규화 캐시 (normalized entity cache)

- 서버 응답을 **엔티티(행) 단위**로 쪼개서 저장 (DB처럼)
- 각 엔티티는 보통 `__typename + id`로 **유일키**를 가짐
- 어느 쿼리에서 받아왔건, 같은 엔티티면 **한 칸(레코드)** 을 공유
- **장점:** 한 번 수정하면 **모든 화면**이 함께 최신화
- **대표:** Apollo Client, Relay, urql Graphcache

---

## 2) 라이브러리별 “캐시 방식” 큰 그림

| 라이브러리                      | 기본 캐시                                       | 특징/갱신 방식                                                                                                                                                    |
| ------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Apollo Client**               | **정규화 캐시**(InMemoryCache)                  | 기본 `useQuery`는 `cache-first`: 캐시에 있으면 네트워크 안 탐. `typePolicies`로 키/병합/페이지네이션 제어. **`useMutation`은 항상 네트워크**(결과는 캐시에 병합). |
| **Relay**                       | **정규화 캐시**(Store)                          | **Global Object Identification**(`id: ID!`/`Node`) 규약을 강하게 활용. 정규화·업데이트·GC가 강력.                                                                 |
| **urql**                        | 기본은 문서 캐시, **Graphcache 추가 시 정규화** | `@urql/exchange-graphcache` 사용 시 Apollo/Relay처럼 정규화·자동 갱신 가능.                                                                                       |
| **TanStack Query(React Query)** | **쿼리 키 캐시**                                | GraphQL 전용 아님. 키/옵션(`staleTime`, `cacheTime`)으로 재검증·Invalidation 제어. 엔티티 정규화는 직접 구현 또는 보조 도구 필요.                                 |

---

## 3) Apollo 기준으로 “어떻게 동작하나”

### 3-1. Query 흐름

1. `useQuery(GET_POST, { variables: { id: "1" } })` 실행
2. **기본 정책 = `cache-first`**
   - 캐시에 해당 데이터가 있으면 → 네트워크 안 타고 캐시에서 반환
   - 없으면 → 요청 후 응답을 정규화해서 캐시에 저장
3. 다음에 같은 데이터를 요구하는 쿼리가 오면 캐시에서 즉시 반환 (빠름)

> **정규화 키:** 보통 `__typename + id/_id` 조합.  
> 스키마에 id가 없다면 `typePolicies.keyFields`로 다른 필드 지정 필요.

### 3-2. Mutation 흐름

- `useMutation(UPDATE_POST)`는 **클릭할 때마다 진짜 네트워크 요청**을 보냄 → **비용 발생**
- 응답으로 받은 엔티티는 **같은 키**(`__typename + id`)로 캐시에 **병합/덮어쓰기**
- 화면은 즉시 최신처럼 보이지만, **요청 자체는 매번 발생**
- `fetchPolicy`는 mutation에서 `network-only`/`no-cache`만 지원 (쿼리처럼 `cache-first`는 없음)

> 필요 시 `optimisticResponse`, `update(cache, result)`, `cache.modify`로 리스트/페이지네이션 갱신 가능.

### 3-3. 페이지네이션/목록 병합

- 새 페이지 응답이 오면 기존 목록과 **합쳐야** 함 (안 그러면 덮어씀)
- `typePolicies`에서 해당 필드에 `merge`, `read`, `keyArgs` 설정으로 제어

---

## 4) TanStack Query(React Query) 관점의 GraphQL

- GraphQL이어도 **쿼리 키 기반 캐싱**만 관리
- 데이터 갱신은 `invalidateQueries`로 재검증/재요청 유도
- 최신성 제어: `staleTime`(신선 기간), `cacheTime`(메모리에 남는 기간)

---

## 5) Relay / urql 간단 그림

- **Relay**: 스키마가 **Node/ID** 규약을 따르면 가장 강력한 정규화/업데이트/GC 제공. 대규모 앱에서 일관성 높음.
- **urql + Graphcache**: 플러그인으로 정규화 활성화. 문서 캐시 ↔ 정규화 캐시를 교체 가능.

---

## 6) 서버/네트워크 레이어 캐시 (참고)

- GraphQL은 흔히 **POST**로 보내서 CDN 캐싱이 어렵지만,
- **Persisted Query + GET** 방식으로 캐싱을 적용하기도 함 (대규모 서비스 최적화)
- 여기서 말한 캐시는 주로 **클라이언트 캐시**(앱 메모리)

---

## 7) 실무 팁 (중요한 오해 제거)

1. **“캐시되면 서버 비용 0?” → X**

   - **Query**는 캐시 덕에 네트워크를 안 탈 수 있음
   - **Mutation은 항상 네트워크** 요청을 발생시킴

2. **중복 클릭 방지**

   - `loading` 동안 버튼 비활성화 / 디바운스 / 서버 멱등성 키 사용

3. **ID가 없으면 정규화 실패**

   - 스키마가 `id`를 안 주면 Apollo `keyFields`로 유일키 정의 필요

4. **목록/페이지네이션은 별도 정책 필요**

   - `typePolicies.merge/read/keyArgs`로 병합 규칙을 꼭 넣자

5. **React Query 사용 시**
   - 엔티티 자동 병합 없음 → `invalidateQueries`로 갱신 흐름을 설계해야 함

---

## 8) 한눈에 끝내는 요약

- **캐시는 라이브러리의 책임**: Apollo/Relay/urql → 정규화, TanStack Query → 쿼리 키
- **Query**: 캐시 덕에 네트워크 스킵 가능 (`cache-first`)
- **Mutation**: 항상 네트워크 요청 → 결과는 정규화 캐시로 병합
- **정규화 키**: 보통 `__typename + id` (필요 시 정책으로 수정 가능)
