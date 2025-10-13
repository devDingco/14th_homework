import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SelectBox } from './index';

const meta = {
  title: 'Commons/Components/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '셀렉트박스의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '셀렉트박스의 테마',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    disabled: {
      control: 'boolean',
      description: '셀렉트박스 비활성화 상태',
    },
  },
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">옵션을 선택하세요</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

// Primary 변형
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Primary SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

export const PrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Primary SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

// Secondary 변형
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Secondary SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

export const SecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Secondary SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

// Tertiary 변형
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Tertiary SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

export const TertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Tertiary SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

// 크기 변형
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Small SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Medium SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Large SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

// 상태 변형
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Disabled SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

export const Error: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    error: true,
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Error SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

export const ErrorDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    error: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <SelectBox {...args}>
      <option value="">Error SelectBox</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectBox>
  ),
};

// 모든 변형 조합 (Light Theme)
export const AllVariantsLight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SelectBox variant="primary" size="small" theme="light">
          <option value="">Small Primary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="primary" size="medium" theme="light">
          <option value="">Medium Primary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="primary" size="large" theme="light">
          <option value="">Large Primary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SelectBox variant="secondary" size="small" theme="light">
          <option value="">Small Secondary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="secondary" size="medium" theme="light">
          <option value="">Medium Secondary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="secondary" size="large" theme="light">
          <option value="">Large Secondary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SelectBox variant="tertiary" size="small" theme="light">
          <option value="">Small Tertiary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="tertiary" size="medium" theme="light">
          <option value="">Medium Tertiary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="tertiary" size="large" theme="light">
          <option value="">Large Tertiary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
      </div>
    </div>
  ),
};

// 모든 변형 조합 (Dark Theme)
export const AllVariantsDark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SelectBox variant="primary" size="small" theme="dark">
          <option value="">Small Primary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="primary" size="medium" theme="dark">
          <option value="">Medium Primary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="primary" size="large" theme="dark">
          <option value="">Large Primary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SelectBox variant="secondary" size="small" theme="dark">
          <option value="">Small Secondary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="secondary" size="medium" theme="dark">
          <option value="">Medium Secondary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="secondary" size="large" theme="dark">
          <option value="">Large Secondary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SelectBox variant="tertiary" size="small" theme="dark">
          <option value="">Small Tertiary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="tertiary" size="medium" theme="dark">
          <option value="">Medium Tertiary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="tertiary" size="large" theme="dark">
          <option value="">Large Tertiary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
      </div>
    </div>
  ),
};

// 상태 모음
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SelectBox variant="primary" theme="light">
          <option value="">Normal State</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="primary" theme="light" disabled>
          <option value="">Disabled State</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="primary" theme="light" error>
          <option value="">Error State</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
      </div>
    </div>
  ),
};

// 비활성화 상태 모음
export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SelectBox variant="primary" theme="light" disabled>
          <option value="">Primary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="secondary" theme="light" disabled>
          <option value="">Secondary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
        <SelectBox variant="tertiary" theme="light" disabled>
          <option value="">Tertiary</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
        </SelectBox>
      </div>
    </div>
  ),
};

// 실제 사용 예시 (카테고리 선택)
export const CategorySelector: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <SelectBox variant="primary" theme="light">
        <option value="">카테고리 선택</option>
        <option value="electronics">전자제품</option>
        <option value="fashion">패션</option>
        <option value="food">식품</option>
        <option value="books">도서</option>
        <option value="sports">스포츠</option>
      </SelectBox>
    </div>
  ),
};

// 실제 사용 예시 (정렬 옵션)
export const SortSelector: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <SelectBox variant="tertiary" theme="light" size="small">
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
        <option value="price-low">가격 낮은순</option>
        <option value="price-high">가격 높은순</option>
      </SelectBox>
    </div>
  ),
};

