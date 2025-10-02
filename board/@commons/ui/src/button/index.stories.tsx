import { MyButton } from ".";

export default{
    component: MyButton
}

export const Basic = {
    render: () => {
       return  <MyButton type="submit" >등록하기</MyButton>
    }
}