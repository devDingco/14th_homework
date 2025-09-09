import cn from "classnames"
import Zipstyles from './InputZipcode.module.css'
import Formstyles from './Inputfield.module.css'
import { ZipcodeProps } from '@/types';
import Button from '../button/Button'

export default function InputZipcode(props: ZipcodeProps){ 
    return(
        <div className={cn(Formstyles.Formfield, Zipstyles.postForm__address__group)}>
        <div>
            <div><label>주소</label>{props.required && <span>*</span>}</div>
            <div className={Zipstyles.zipCode__group}>
                <input type="text" placeholder="01234" />
                <Button variant='FormBtn' type='button'>우편번호 검색</Button>
            </div>
        </div>
        <input type="text" placeholder={props.placeholder} />
        {props.placeholder_2 && <input type="text" placeholder={props.placeholder_2}/>}
      </div>
    );
}