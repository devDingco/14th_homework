// src/app/monorepo-demo/page.tsx
"use client";

import React, { useState } from "react";

// ==================== UI 패키지 컴포넌트 ====================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = ({
  variant = "primary",
  size = "md",
  isLoading,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "font-medium rounded transition-colors focus:ring-2 disabled:opacity-50";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className = "", ...props }: InputProps) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-blue-500"
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

// ==================== 데모 컴포넌트 ====================
const ButtonStories = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Button Variants</h3>
    <div className="flex gap-2 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button isLoading>Loading</Button>
    </div>

    <h3 className="text-lg font-semibold">Button Sizes</h3>
    <div className="flex gap-2 items-end">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  </div>
);

const InputStories = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Input States</h3>
    <div className="space-y-2 max-w-md">
      <Input placeholder="Normal input" />
      <Input label="With Label" placeholder="Labeled input" />
      <Input error="This field is required" placeholder="Error state" />
    </div>
  </div>
);

const LoginExample = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Login Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="user@example.com"
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Enter password"
        />
        <Button type="submit" className="w-full" isLoading={loading}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

// ==================== 메인 페이지 ====================
export default function MonorepoDemo() {
  const [activeTab, setActiveTab] = useState<"stories" | "example">("stories");
  const [activeComponent, setActiveComponent] = useState<"button" | "input">(
    "button"
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">UI 패키지 데모</h1>

        {/* 네비게이션 */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setActiveTab("stories")}
            className={`px-4 py-2 rounded ${
              activeTab === "stories" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            📚 스토리북
          </button>
          <button
            onClick={() => setActiveTab("example")}
            className={`px-4 py-2 rounded ${
              activeTab === "example" ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            🎯 사용예제
          </button>
        </div>

        {activeTab === "stories" && (
          <div className="flex gap-4 mb-4 justify-center">
            <button
              onClick={() => setActiveComponent("button")}
              className={`px-4 py-2 rounded ${
                activeComponent === "button"
                  ? "bg-purple-600 text-white"
                  : "bg-white"
              }`}
            >
              Button
            </button>
            <button
              onClick={() => setActiveComponent("input")}
              className={`px-4 py-2 rounded ${
                activeComponent === "input"
                  ? "bg-orange-600 text-white"
                  : "bg-white"
              }`}
            >
              Input
            </button>
          </div>
        )}

        {/* 컨텐츠 */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === "stories" ? (
            activeComponent === "button" ? (
              <ButtonStories />
            ) : (
              <InputStories />
            )
          ) : (
            <LoginExample />
          )}
        </div>

        {/* 설명 */}
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold mb-2">모노레포 아키텍처</h3>
          <p className="text-sm text-gray-600">
            UI 컴포넌트를 독립 패키지로 관리하여 여러 프로젝트에서 재사용
          </p>
        </div>
      </div>
    </div>
  );
}
