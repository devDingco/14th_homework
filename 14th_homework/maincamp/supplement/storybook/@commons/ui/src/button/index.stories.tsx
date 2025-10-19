import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';

/**
 * Button 컴포넌트는 사용자의 액션을 처리하는 공통 컴포넌트입니다.
 * 다양한 변형과 크기를 제공합니다.
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: '버튼의 스타일 변형',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Primary 버튼입니다.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '등록하기',
  },
};

/**
 * Secondary 버튼입니다.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '취소',
  },
};

/**
 * 위험한 액션을 나타내는 Danger 버튼입니다.
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '삭제',
  },
};

/**
 * 투명 배경의 Ghost 버튼입니다.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '더보기',
  },
};

/**
 * Small 크기의 버튼입니다.
 */
export const Small: Story = {
  args: {
    size: 'small',
    children: '작은 버튼',
  },
};

/**
 * Medium 크기의 버튼입니다 (기본값).
 */
export const Medium: Story = {
  args: {
    size: 'medium',
    children: '중간 버튼',
  },
};

/**
 * Large 크기의 버튼입니다.
 */
export const Large: Story = {
  args: {
    size: 'large',
    children: '큰 버튼',
  },
};

/**
 * 전체 너비를 사용하는 버튼입니다.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '전체 너비 버튼',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * 로딩 상태의 버튼입니다.
 */
export const Loading: Story = {
  args: {
    loading: true,
    children: '제출하기',
  },
};

/**
 * 비활성화된 버튼입니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화',
  },
};

/**
 * 게시물 등록 페이지의 실제 사용 예시입니다.
 */
export const BoardsWriteExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="secondary">취소</Button>
      <Button variant="primary">게시글 등록하기</Button>
    </div>
  ),
};

/**
 * 다양한 버튼 변형을 모두 보여주는 예시입니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="primary" size="small">
          Small
        </Button>
        <Button variant="primary" size="medium">
          Medium
        </Button>
        <Button variant="primary" size="large">
          Large
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="primary" loading>
          Loading
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};
