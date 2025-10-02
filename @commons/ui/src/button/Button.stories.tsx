import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from './index';

const meta = {
  title: 'Components/MyButton',
  component: MyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 로그인/회원가입 페이지용 버튼
export const PrimaryMedium: Story = {
  args: {
    children: '로그인',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    children: '회원가입',
    variant: 'secondary',
    size: 'medium',
  },
};

// 등록/수정 페이지용 버튼
export const PrimarySmall: Story = {
  args: {
    children: '등록하기',
    variant: 'primary',
    size: 'small',
    type: 'submit',
  },
};

export const Cancel: Story = {
  args: {
    children: '취소',
    variant: 'cancel',
    size: 'small',
    type: 'button',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    children: '비활성화 버튼',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};
