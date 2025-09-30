import cn from "classnames";
import Zipstyles from "./InputBoardAddress.module.css";
import Formstyles from "./Inputfield.module.css";
import { ZipcodeProps } from "@/types";
import Button from "../button/Button";
import styles from "./InputBoardAddress.module.css";

export default function InputBoardAddress(props: ZipcodeProps) {
  const { zipcode, address, addressDetail } = props.value;

  return (
    <div
      className={cn(Formstyles.Formfield, Zipstyles.postForm__address__group)}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <label>주소</label>
          {props.required && <span>*</span>}
        </div>
        <div className={Zipstyles.zipCode__group}>
          <input
            type="text"
            id="zipcode"
            value={zipcode}
            readOnly
            placeholder="01234"
            onChange={props.onChange}
          />
          <Button variant="FormBtn" type="button" onClick={props.onClick}>
            우편번호 검색
          </Button>
        </div>
      </div>
      <input
        type="text"
        id="address"
        placeholder={props.placeholder}
        value={address}
        readOnly
        onChange={props.onChange}
      />
      {props.placeholder_2 && (
        <input
          type="text"
          id="addressDetail"
          placeholder={props.placeholder_2}
          value={addressDetail}
          onChange={props.onChange}
        />
      )}
    </div>
  );
}
