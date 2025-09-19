/* button types */
export type ButtonType = 'submit' | 'reset' | 'button';
export type ButtonProps = {
    children: React.ReactNode;
    variant: string;
    type: ButtonType;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }


/* input types */
export type InputProps = {
    variant?: string;
    label?: string;
    required?: boolean;
    type: string;
    placeholder: string;
    id?: string;
    isEdit?: boolean;
    value?:string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }


/* textarea types */
export type TextareaProps = {
    variant?: string;
    label?: string;
    required?: boolean;
    placeholder: string;
    id?:string;
    value?:string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isCommentField?: boolean;
    maxLength?: number;
}

/* zipcode types */
export type ZipcodeProps = {
    variant?: string;
    required?: boolean;
    placeholder: string;
    placeholder_2?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value?: {zipcode: string, address:string, addressDetail:string};
    isEdit?: boolean;
}