"use client"
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useState } from 'react';

export function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 변경 로직
    console.log('비밀번호 변경:', formData);
  };

  return (
    <div>
      <h1 className="text-gray-900 mb-6">비밀번호변경</h1>

      <Card className="p-6 max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">현재 비밀번호</Label>
            <Input
              id="current-password"
              type="password"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">새 비밀번호</Label>
            <Input
              id="new-password"
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              placeholder="새 비밀번호를 입력하세요"
            />
            <p className="text-gray-500">
              8자 이상, 영문/숫자/특수문자 포함
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
            <Input
              id="confirm-password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="새 비밀번호를 다시 입력하세요"
            />
          </div>

          <Button type="submit" className="w-full">
            비밀번호 변경
          </Button>
        </form>
      </Card>
    </div>
  );
}
