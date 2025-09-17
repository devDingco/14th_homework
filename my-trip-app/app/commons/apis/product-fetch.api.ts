"use client";

// 임시 테스트용 직접 fetch API
export async function fetchTravelproductsFetchApi(page: number = 1, search: string = "", isSoldout: boolean = false) {
  try {
    console.log('🔍 Direct Fetch API 호출 시작');
    
    const query = `
      query fetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {
        fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {
          _id
          name
          contents
          price
          images
          pickedCount
          tags
          seller {
            _id
            name
          }
          travelproductAddress {
            address
            addressDetail
            lat
            lng
          }
          createdAt
          updatedAt
        }
      }
    `;

    const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          page,
          search,
          isSoldout
        }
      })
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('📊 Direct Fetch 응답:', result);

    if (result.errors) {
      console.error('🚨 GraphQL 에러:', result.errors);
      return [];
    }

    return result.data?.fetchTravelproducts || [];
  } catch (error) {
    console.error('🚨 Direct Fetch 에러:', error);
    return [];
  }
}
