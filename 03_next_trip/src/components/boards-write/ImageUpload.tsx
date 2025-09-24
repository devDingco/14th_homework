'use client';
import { CheckValidInputFile } from '@/utils/ValidInputFile';
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRef } from 'react';
import { MdAdd, MdOutlineClose } from 'react-icons/md';

const UPLOAD_FILE = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

type TImageUploadProps = {
  idx: number;
  image: string;
  onChangeImages: (idx: number, image: string) => void;
  onRemoveImages: (idx: number) => void;
};

export default function ImageUpload({
  idx,
  image,
  onChangeImages,
  onRemoveImages,
}: TImageUploadProps) {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [imageUrl, setImageUrl] = useState<string>('');

  const handleInputRefClick = () => {
    fileInputRef.current?.click();
  };

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const validResult = CheckValidInputFile(file);

    if (!validResult) return;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
      };
      reader.readAsDataURL(file);

      const result = await uploadFile({ variables: { file } });
      // console.log(result.data?.uploadFile.url);
      // setImageUrl(URL.createObjectURL(file));
      onChangeImages(idx, result?.data?.uploadFile.url);
    }
  };

  return (
    <div className='relative flex h-[100px] w-[100px] flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-none bg-[#f2f2f2] object-cover px-2 text-sm font-normal leading-normal text-gray-400 tablet:h-40 tablet:w-40'>
      {image && (
        <>
          <Image
            className='h-full w-full'
            // src={`https://storage.googleapis.com/${imageUrl}`}
            src={`https://storage.googleapis.com/${image}`}
            alt='alt'
            fill
            sizes='100px 100px'
          />
          <button
            type='button'
            className='absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white opacity-40 hover:opacity-100'
            onClick={() => onRemoveImages(idx)}
          >
            <MdOutlineClose />
          </button>
        </>
      )}
      {!image && (
        <>
          <div
            onClick={handleInputRefClick}
            className='flex h-full w-full cursor-pointer flex-col items-center justify-center'
          >
            <MdAdd className='text-2xl text-gray-400' />
            <p className='cursor-pointer text-center text-xs'>
              <span className='hidden'>클릭해서 </span>사진 업로드
            </p>
          </div>

          <input
            className='hidden'
            type='file'
            onChange={onChangeFile}
            ref={fileInputRef}
            accept='image/webp, image/jpeg, image/png'
          />
        </>
      )}
    </div>
  );
}
