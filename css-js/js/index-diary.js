const diary__list = `
    <div id="card__list" class="content__diary__list">
    </div>
`
const diary__filter = `
    <div class="filter__main">
        <div class="dropdown__group">
            <img class="dropdown__img" src="./assets/icons/down_fill_light_m.svg"/>
            <input type="checkbox" id="dropdown__title" class="dropdown__title"/>
            <ul class="dropdown__list">
                <li>
                    <input type="radio" id="전체" name="dropdown" onclick="selectDropDown(event);dropdownEvent(event)"/>
                    <label for="전체">전체<img src="./assets/icons/check_outline_light_xs.svg"/></label>
                </li>
                <li>
                    <input type="radio" id="행복해요" name="dropdown" onclick="selectDropDown(event);dropdownEvent(event);"/>
                    <label for="행복해요">행복해요<img src="./assets/icons/check_outline_light_xs.svg" /></label>
                </li>
                <li>
                    <input type="radio" id="슬퍼요" name="dropdown" onclick="selectDropDown(event);dropdownEvent(event);"/>
                    <label for="슬퍼요">슬퍼요<img src="./assets/icons/check_outline_light_xs.svg" /></label>
                </li>
                <li>
                    <input type="radio" id="놀랐어요" name="dropdown" onclick="selectDropDown(event);dropdownEvent(event);"/>
                    <label for="놀랐어요">놀랐어요<img src="./assets/icons/check_outline_light_xs.svg" /></label>
                </li>
                <li>
                    <input type="radio" id="화나요" name="dropdown" onclick="selectDropDown(event);dropdownEvent(event);"/>
                    <label for="화나요">화나요<img src="./assets/icons/check_outline_light_xs.svg" /></label>
                </li>
                <li>
                    <input type="radio" id="기타" name="dropdown" onclick="selectDropDown(event);dropdownEvent(event);"/>
                    <label for="기타">기타<img src="./assets/icons/check_outline_light_xs.svg" /></label>
                </li>
            </ul>
        </div>
        <div class="searchbar__group">
            <img src="./assets/icons/search_outline_light_m.svg" />
            <input type="text" placeholder="검색어를 입력해 주세요." oninput="inputSearch(event)"/>
        </div>
    </div>    

    <button class="add__diary__button" onclick="viewModal('write__form__modal')">
        <img src="./assets/icons/plus_outline_light_m.svg" />일기쓰기</button>
`