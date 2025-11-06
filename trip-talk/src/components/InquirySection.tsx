import { useState } from 'react';
import { Button } from './accommodation_ui/button';
import { Textarea } from './accommodation_ui/textarea';
import { Card } from './accommodation_ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './accommodation_ui/avatar';
import { Badge } from './accommodation_ui/badge';
import { Separator } from './accommodation_ui/separator';
import { MessageCircle, Send, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface InquiryReply {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
  isHost: boolean;
}

interface Inquiry {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'answered';
  replies: InquiryReply[];
  
}

interface InquirySectionProps {
  hostName: string;
}

export default function InquirySection({ hostName }: InquirySectionProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: '1',
      author: '김민지',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      content: '주차는 가능한가요? 그리고 체크인 시간을 조금 앞당길 수 있을까요?',
      createdAt: '2024-11-03 14:30',
      status: 'answered',
      replies: [
        {
          id: 'r1',
          author: hostName,
          content: '안녕하세요. 무료 주차 가능합니다. 체크인 시간은 당일 상황에 따라 조율 가능하니 전화로 미리 연락 주시면 감사하겠습니다.',
          createdAt: '2024-11-03 15:10',
          isHost: true,
        },
      ],
    },
    {
      id: '2',
      author: '이서준',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      content: '반려동물 동반이 가능한가요? 소형견 1마리입니다.',
      createdAt: '2024-11-02 10:20',
      status: 'answered',
      replies: [
        {
          id: 'r2',
          author: hostName,
          content: '반려동물 동반 가능합니다. 다만 추가 청소비가 발생할 수 있으니 예약 시 미리 말씀 부탁드립니다.',
          createdAt: '2024-11-02 11:05',
          isHost: true,
        },
      ],
    },
    {
      id: '3',
      author: '박지훈',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      content: '조식은 몇 시부터 가능한가요?',
      createdAt: '2024-11-01 18:45',
      status: 'pending',
      replies: [],
    },
  ]);

  const [newInquiry, setNewInquiry] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedInquiries, setExpandedInquiries] = useState<Set<string>>(new Set(['1', '2']));

  const handleSubmitInquiry = () => {
    if (!newInquiry.trim()) {
      toast.error('문의 내용을 입력해주세요');
      return;
    }

    const inquiry: Inquiry = {
      id: Date.now().toString(),
      author: '나',
      content: newInquiry,
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'pending',
      replies: [],
    };

    setInquiries([inquiry, ...inquiries]);
    setNewInquiry('');
    toast.success('문의가 등록되었습니다');
  };

  const handleSubmitReply = (inquiryId: string) => {
    if (!replyContent.trim()) {
      toast.error('답변 내용을 입력해주세요');
      return;
    }

    setInquiries(
      inquiries.map((inquiry) => {
        if (inquiry.id === inquiryId) {
          const reply: InquiryReply = {
            id: Date.now().toString(),
            author: hostName,
            content: replyContent,
            createdAt: new Date().toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
            isHost: true,
          };

          return {
            ...inquiry,
            status: 'answered' as const,
            replies: [...inquiry.replies, reply],
          };
        }
        return inquiry;
      })
    );

    setReplyContent('');
    setReplyingTo(null);
    toast.success('답변이 등록되었습니다');
  };

  const toggleExpanded = (inquiryId: string) => {
    const newExpanded = new Set(expandedInquiries);
    if (newExpanded.has(inquiryId)) {
      newExpanded.delete(inquiryId);
    } else {
      newExpanded.add(inquiryId);
    }
    setExpandedInquiries(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">문의하기</h2>
        <p className="text-sm text-gray-600">
          숙소에 대해 궁금한 점을 문의해주세요. 호스트가 답변해드립니다.
        </p>
      </div>

      {/* 문의 작성 폼 */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>나</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={newInquiry}
                onChange={(e) => setNewInquiry(e.target.value)}
                placeholder="문의 내용을 입력하세요"
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmitInquiry}>
              <Send className="w-4 h-4 mr-2" />
              문의하기
            </Button>
          </div>
        </div>
      </Card>

      {/* 문의 목록 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg">
            문의 내역
            <span className="ml-2 text-sm text-gray-500">({inquiries.length})</span>
          </h3>
        </div>

        {inquiries.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>아직 문의가 없습니다</p>
              <p className="text-sm mt-1">첫 번째 문의를 남겨보세요!</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inquiry) => {
              const isExpanded = expandedInquiries.has(inquiry.id);

              return (
                <Card key={inquiry.id} className="overflow-hidden">
                  {/* 문의 내용 */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={inquiry.avatar} />
                        <AvatarFallback>{inquiry.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{inquiry.author}</span>
                          <span className="text-xs text-gray-500">{inquiry.createdAt}</span>
                          <Badge
                            variant={inquiry.status === 'answered' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {inquiry.status === 'answered' ? '답변완료' : '답변대기'}
                          </Badge>
                        </div>
                        <p className="text-gray-700 break-words">{inquiry.content}</p>

                        {/* 답변 보기/접기 버튼 */}
                        {inquiry.replies.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(inquiry.id)}
                            className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-1" />
                                답변 접기
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4 mr-1" />
                                답변 보기 ({inquiry.replies.length})
                              </>
                            )}
                          </Button>
                        )}

                        {/* 답글 버튼 (호스트용 - 데모를 위해 모든 사용자에게 표시) */}
                        {inquiry.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingTo(inquiry.id)}
                            className="mt-2 p-0 h-auto text-gray-600 hover:text-gray-700"
                          >
                            <Reply className="w-4 h-4 mr-1" />
                            답변하기
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 답변 목록 */}
                  {isExpanded && inquiry.replies.length > 0 && (
                    <div className="bg-gray-50 border-t">
                      <div className="p-4 space-y-4">
                        {inquiry.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <Avatar className="w-9 h-9">
                              <AvatarImage src={reply.avatar} />
                              <AvatarFallback>{reply.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{reply.author}</span>
                                {reply.isHost && (
                                  <Badge variant="outline" className="text-xs">
                                    호스트
                                  </Badge>
                                )}
                                <span className="text-xs text-gray-500">{reply.createdAt}</span>
                              </div>
                              <p className="text-gray-700 text-sm break-words">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 답변 작성 폼 */}
                  {replyingTo === inquiry.id && (
                    <div className="bg-blue-50 border-t p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=host" />
                          <AvatarFallback>호</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <Textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="답변을 입력하세요"
                            rows={2}
                            className="resize-none bg-white"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent('');
                              }}
                            >
                              취소
                            </Button>
                            <Button size="sm" onClick={() => handleSubmitReply(inquiry.id)}>
                              <Send className="w-3 h-3 mr-1" />
                              답변 등록
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
