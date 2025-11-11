// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Modal from "./index";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "danger"],
      description: "모달의 변형 타입",
    },
    actions: {
      control: "select",
      options: ["single", "dual", "cash"],
      description: "모달의 액션 버튼 타입",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "모달의 테마",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    description: {
      control: "text",
      description: "모달 설명",
    },
    confirmText: {
      control: "text",
      description: "확인 버튼 텍스트",
    },
    cancelText: {
      control: "text",
      description: "취소 버튼 텍스트",
    },
  },
  args: {
    onConfirm: fn(),
    onCancel: fn(),
    onDropdownChange: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleActionInfo: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "light",
    title: "알림",
    description: "이 작업을 완료하시겠습니까?",
    confirmText: "확인",
    onConfirm: fn(),
  },
};

export const DualActionInfo: Story = {
  args: {
    variant: "info",
    actions: "dual",
    theme: "light",
    title: "확인",
    description: "이 작업을 진행하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export const CashAction: Story = {
  args: {
    variant: "info",
    actions: "cash",
    theme: "light",
    title: "결제 수단 선택",
    description: "결제할 수단을 선택해주세요",
    confirmText: "확인",
    cancelText: "취소",
    dropdownOptions: [
      { value: "card", label: "신용카드" },
      { value: "bank", label: "계좌이체" },
      { value: "point", label: "포인트" },
    ],
    onConfirm: fn(),
    onCancel: fn(),
    onDropdownChange: fn(),
  },
};

export const DangerSingle: Story = {
  args: {
    variant: "danger",
    actions: "single",
    theme: "light",
    title: "삭제 확인",
    description: "정말로 삭제하시겠습니까?",
    confirmText: "삭제",
    onConfirm: fn(),
  },
};

export const DangerDual: Story = {
  args: {
    variant: "danger",
    actions: "dual",
    theme: "light",
    title: "삭제 확인",
    description: "이 작업은 되돌릴 수 없습니다.",
    confirmText: "삭제",
    cancelText: "취소",
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export const DarkThemeSingle: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "dark",
    title: "알림",
    description: "다크 테마 모달입니다.",
    confirmText: "확인",
    onConfirm: fn(),
  },
};

export const DarkThemeDual: Story = {
  args: {
    variant: "info",
    actions: "dual",
    theme: "dark",
    title: "확인",
    description: "다크 테마의 듀얼 액션 모달입니다.",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export const WithoutDescription: Story = {
  args: {
    variant: "info",
    actions: "dual",
    theme: "light",
    title: "제목만 있는 모달",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: fn(),
    onCancel: fn(),
  },
};
