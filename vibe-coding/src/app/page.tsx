'use client';

import React, { useState } from 'react';
import Button, { ButtonGroup } from '@/commons/components/button';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-var(--color-bg-primary)">
      <div className="max-w-6xl mx-auto">
        <h1 className="typography-display-large text-center mb-12 text-var(--color-text-primary)">
          Button Component Test
        </h1>
        
        {/* Variant Tests */}
        <section className="mb-12">
          <h2 className="typography-headline-medium mb-6 text-var(--color-text-primary)">
            Variants (Light Theme)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Variants */}
            <div className="space-y-4">
              <h3 className="typography-title-medium text-var(--color-text-secondary)">Primary</h3>
              <div className="space-y-3">
                <Button variant="primary" size="small" theme="light">
                  Small Primary
                </Button>
                <Button variant="primary" size="medium" theme="light">
                  Medium Primary
                </Button>
                <Button variant="primary" size="large" theme="light">
                  Large Primary
                </Button>
              </div>
            </div>

            {/* Secondary Variants */}
            <div className="space-y-4">
              <h3 className="typography-title-medium text-var(--color-text-secondary)">Secondary</h3>
              <div className="space-y-3">
                <Button variant="secondary" size="small" theme="light">
                  Small Secondary
                </Button>
                <Button variant="secondary" size="medium" theme="light">
                  Medium Secondary
                </Button>
                <Button variant="secondary" size="large" theme="light">
                  Large Secondary
                </Button>
              </div>
            </div>

            {/* Tertiary Variants */}
            <div className="space-y-4">
              <h3 className="typography-title-medium text-var(--color-text-secondary)">Tertiary</h3>
              <div className="space-y-3">
                <Button variant="tertiary" size="small" theme="light">
                  Small Tertiary
                </Button>
                <Button variant="tertiary" size="medium" theme="light">
                  Medium Tertiary
                </Button>
                <Button variant="tertiary" size="large" theme="light">
                  Large Tertiary
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dark Theme Variants */}
        <section className="mb-12 p-6 bg-var(--color-bg-inverse) rounded-lg">
          <h2 className="typography-headline-medium mb-6 text-var(--color-text-inverse)">
            Variants (Dark Theme)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Dark */}
            <div className="space-y-4">
              <h3 className="typography-title-medium text-var(--color-text-inverse)">Primary</h3>
              <div className="space-y-3">
                <Button variant="primary" size="small" theme="dark">
                  Small Primary
                </Button>
                <Button variant="primary" size="medium" theme="dark">
                  Medium Primary
                </Button>
                <Button variant="primary" size="large" theme="dark">
                  Large Primary
                </Button>
              </div>
            </div>

            {/* Secondary Dark */}
            <div className="space-y-4">
              <h3 className="typography-title-medium text-var(--color-text-inverse)">Secondary</h3>
              <div className="space-y-3">
                <Button variant="secondary" size="small" theme="dark">
                  Small Secondary
                </Button>
                <Button variant="secondary" size="medium" theme="dark">
                  Medium Secondary
                </Button>
                <Button variant="secondary" size="large" theme="dark">
                  Large Secondary
                </Button>
              </div>
            </div>

            {/* Tertiary Dark */}
            <div className="space-y-4">
              <h3 className="typography-title-medium text-var(--color-text-inverse)">Tertiary</h3>
              <div className="space-y-3">
                <Button variant="tertiary" size="small" theme="dark">
                  Small Tertiary
                </Button>
                <Button variant="tertiary" size="medium" theme="dark">
                  Medium Tertiary
                </Button>
                <Button variant="tertiary" size="large" theme="dark">
                  Large Tertiary
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Special States */}
        <section className="mb-12">
          <h2 className="typography-headline-medium mb-6 text-var(--color-text-primary)">
            Special States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="typography-title-small text-var(--color-text-secondary)">Disabled</h3>
              <Button variant="primary" disabled>
                Disabled Button
              </Button>
            </div>
            
            <div className="space-y-3">
              <h3 className="typography-title-small text-var(--color-text-secondary)">Loading</h3>
              <Button 
                variant="primary" 
                loading={loading}
                onClick={handleLoadingTest}
              >
                {loading ? 'Loading...' : 'Click to Load'}
              </Button>
            </div>
            
            <div className="space-y-3">
              <h3 className="typography-title-small text-var(--color-text-secondary)">Full Width</h3>
              <Button variant="secondary" fullWidth>
                Full Width Button
              </Button>
            </div>
            
            <div className="space-y-3">
              <h3 className="typography-title-small text-var(--color-text-secondary)">With Icons</h3>
              <Button 
                variant="primary" 
                leftIcon={<span>📧</span>}
                rightIcon={<span>→</span>}
              >
                Send Email
              </Button>
            </div>
          </div>
        </section>

        {/* Button Groups */}
        <section className="mb-12">
          <h2 className="typography-headline-medium mb-6 text-var(--color-text-primary)">
            Button Groups
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="typography-title-small mb-3 text-var(--color-text-secondary)">
                Horizontal Group
              </h3>
              <ButtonGroup orientation="horizontal" spacing="medium">
                <Button variant="secondary" size="medium">
                  Cancel
                </Button>
                <Button variant="primary" size="medium">
                  Save
                </Button>
                <Button variant="tertiary" size="medium">
                  More
                </Button>
              </ButtonGroup>
            </div>
            
            <div>
              <h3 className="typography-title-small mb-3 text-var(--color-text-secondary)">
                Vertical Group
              </h3>
              <ButtonGroup orientation="vertical" spacing="small">
                <Button variant="tertiary" size="medium" fullWidth>
                  Option 1
                </Button>
                <Button variant="tertiary" size="medium" fullWidth>
                  Option 2
                </Button>
                <Button variant="tertiary" size="medium" fullWidth>
                  Option 3
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* Interactive Test */}
        <section className="mb-12">
          <h2 className="typography-headline-medium mb-6 text-var(--color-text-primary)">
            Interactive Test
          </h2>
          <div className="space-y-4">
            <p className="typography-body-medium text-var(--color-text-secondary)">
              모든 버튼을 클릭해보세요. 호버, 포커스, 액티브 상태를 확인할 수 있습니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                onClick={() => alert('Primary 버튼이 클릭되었습니다!')}
              >
                Primary 클릭
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => alert('Secondary 버튼이 클릭되었습니다!')}
              >
                Secondary 클릭
              </Button>
              <Button 
                variant="tertiary" 
                onClick={() => alert('Tertiary 버튼이 클릭되었습니다!')}
              >
                Tertiary 클릭
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
