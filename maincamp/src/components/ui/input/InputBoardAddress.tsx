import cn from "classnames";
import Zipstyles from "./InputBoardAddress.module.css";
import Formstyles from "./Inputfield.module.css";
import { ZipcodeProps } from "@/types";
import Button from "../button/Button";

export default function InputBoardAddress({
  required,
  onClick,
  placeholder,
  placeholder_2,
  register,
}: ZipcodeProps) {
  console.log(register);
  // const { zipcode, address, addressDetail } = props.value ?? {
  //   zipcode: "",
  //   address: "",
  //   addressDetail: "",
  // };

  return (
    <div
      className={cn(Formstyles.Formfield, Zipstyles.postForm__address__group)}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <label>주소</label>
          {required && <span>*</span>}
        </div>
        <div className={Zipstyles.zipCode__group}>
          <input
            type="text"
            id="zipcode"
            // value={zipcode}
            readOnly
            placeholder="01234"
            // onChange={props.onChange}
            {...register("boardAddress.zipcode")}
          />
          <Button variant="FormBtn" type="button" onClick={onClick}>
            우편번호 검색
          </Button>
        </div>
      </div>
      <input
        type="text"
        id="address"
        placeholder={placeholder}
        // value={address}
        readOnly
        // onChange={props.onChange}
        {...register("boardAddress.address")}
      />
      {placeholder_2 && (
        <input
          type="text"
          id="addressDetail"
          placeholder={placeholder_2}
          // value={addressDetail}
          // onChange={props.onChange}
          {...register("boardAddress.addressDetail")}
        />
      )}
    </div>
  );
}
