import type { Meta, StoryObj } from '@storybook/react';
import { MyInput } from './index';

const meta = {
  title: 'Components/MyInput',
  component: MyInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// 로그인/회원가입 페이지용 (small)
export const Small: Story = {
  args: {
    type: 'email',
    size: 'small',
    placeholder: '이메일을 입력해 주세요.',
  },
};

export const SmallPassword: Story = {
  args: {
    type: 'password',
    size: 'small',
    placeholder: '비밀번호를 입력해 주세요.',
  },
};

// 등록/수정 페이지 작성자/비밀번호용 (medium)
export const Medium: Story = {
  args: {
    type: 'text',
    size: 'medium',
    placeholder: '작성자 명을 입력해주세요.',
  },
};

// 등록/수정 페이지 제목/주소/유튜브용 (large)
export const Large: Story = {
  args: {
    type: 'text',
    size: 'large',
    placeholder: '제목을 입력해 주세요.',
  },
};

// 읽기 전용
export const ReadOnly: Story = {
  args: {
    type: 'text',
    size: 'large',
    placeholder: '주소를 입력해 주세요.',
    value: '서울특별시 강남구 테헤란로',
    readOnly: true,
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    type: 'text',
    size: 'small',
    placeholder: '비활성화된 입력창',
    disabled: true,
  },
};
