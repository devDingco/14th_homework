import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';

/**
 * Input 컴포넌트는 사용자로부터 텍스트 입력을 받는 공통 컴포넌트입니다.
 * 라벨, 에러 메시지, 헬퍼 텍스트 등을 지원합니다.
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드 라벨',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 필드 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: '에러 메시지',
    },
    helperText: {
      control: 'text',
      description: '헬퍼 텍스트',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '입력 필드 크기',
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
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: '입력 타입',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Input 컴포넌트입니다.
 */
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요',
  },
};

/**
 * 라벨이 있는 Input입니다.
 */
export const WithLabel: Story = {
  args: {
    label: '작성자',
    placeholder: '작성자 명을 입력해 주세요.',
  },
};

/**
 * 필수 입력 필드입니다.
 */
export const Required: Story = {
  args: {
    label: '작성자',
    placeholder: '작성자 명을 입력해 주세요.',
    required: true,
  },
};

/**
 * 에러 상태의 Input입니다.
 */
export const WithError: Story = {
  args: {
    label: '작성자',
    placeholder: '작성자 명을 입력해 주세요.',
    required: true,
    error: '필수입력 사항 입니다.',
  },
};

/**
 * 헬퍼 텍스트가 있는 Input입니다.
 */
export const WithHelperText: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    helperText: '이메일 형식으로 입력해주세요.',
    type: 'email',
  },
};

/**
 * Small 크기의 Input입니다.
 */
export const Small: Story = {
  args: {
    label: '작성자',
    placeholder: '작은 입력 필드',
    size: 'small',
  },
};

/**
 * Medium 크기의 Input입니다 (기본값).
 */
export const Medium: Story = {
  args: {
    label: '작성자',
    placeholder: '중간 입력 필드',
    size: 'medium',
  },
};

/**
 * Large 크기의 Input입니다.
 */
export const Large: Story = {
  args: {
    label: '작성자',
    placeholder: '큰 입력 필드',
    size: 'large',
  },
};

/**
 * 비활성화된 Input입니다.
 */
export const Disabled: Story = {
  args: {
    label: '작성자',
    placeholder: '비활성화된 필드',
    disabled: true,
    value: '홍길동',
  },
};

/**
 * Password 타입의 Input입니다.
 */
export const Password: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요.',
    type: 'password',
    required: true,
  },
};

/**
 * 게시물 작성자 입력 필드의 실제 사용 예시입니다.
 */
export const BoardsWriterExample: Story = {
  args: {
    label: '작성자',
    placeholder: '작성자 명을 입력해 주세요.',
    required: true,
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * 게시물 제목 입력 필드의 실제 사용 예시입니다.
 */
export const BoardsTitleExample: Story = {
  args: {
    label: '제목',
    placeholder: '제목을 입력해 주세요.',
    required: true,
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * 다양한 Input 상태를 모두 보여주는 예시입니다.
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input label="기본 상태" placeholder="텍스트를 입력하세요" />
      <Input label="필수 입력" placeholder="텍스트를 입력하세요" required />
      <Input
        label="에러 상태"
        placeholder="텍스트를 입력하세요"
        required
        error="필수입력 사항 입니다."
      />
      <Input
        label="헬퍼 텍스트"
        placeholder="이메일을 입력하세요"
        helperText="example@email.com 형식으로 입력해주세요."
      />
      <Input label="비활성화" placeholder="비활성화된 필드" disabled value="홍길동" />
      <Input label="비밀번호" placeholder="비밀번호를 입력하세요" type="password" />
    </div>
  ),
};

/**
 * 게시물 등록 폼의 실제 사용 예시입니다.
 */
export const BoardsFormExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '996px',
      }}
    >
      <div style={{ display: 'flex', gap: '16px' }}>
        <Input label="작성자" placeholder="작성자 명을 입력해 주세요." required fullWidth />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          required
          fullWidth
        />
      </div>
      <Input label="제목" placeholder="제목을 입력해 주세요." required fullWidth />
      <Input label="유튜브 링크" placeholder="링크를 입력해 주세요." fullWidth />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
