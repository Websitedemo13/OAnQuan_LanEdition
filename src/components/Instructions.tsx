import React, { useState } from 'react';

interface CardInfo {
  id: number;
  name: string;
  desc: string;
  type: 'IMMEDIATE' | 'HOLD';
  emoji: string;
  image?: string;
}

const Instructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'rules' | 'cards'>('rules');

  const cards: CardInfo[] = [
    { id: 1, name: "NGON THÍIII", desc: "Ô cuối cùng ăn được X2", type: 'IMMEDIATE', emoji: '✨', image: '/cards/1-ngon-thiiii.svg' },
    { id: 2, name: "HỒNG NHAN BẠC PHẬN", desc: "-4 điểm", type: 'IMMEDIATE', emoji: '💔', image: '/cards/2-hong-nhan.svg' },
    { id: 3, name: "CÒN GÌ ĐẸP HƠN", desc: "+1 lượt rải", type: 'IMMEDIATE', emoji: '⚡', image: '/cards/3-con-gi-dep.svg' },
    { id: 4, name: "VÌ EM XỨNG ĐÁNG", desc: "+2 điểm", type: 'IMMEDIATE', emoji: '💝', image: '/cards/4-vi-em-xung.svg' },
    { id: 5, name: "XÀ CÀ NU", desc: "Mất 1 lượt", type: 'IMMEDIATE', emoji: '🛑', image: '/cards/5-xa-ca-nu.svg' },
    { id: 6, name: "RỤNG ĐÁ", desc: "Đối phương bỏ 5 đá", type: 'IMMEDIATE', emoji: '💧', image: '/cards/6-rung-da.svg' },
    { id: 7, name: "CƯỚP QUAN", desc: "Cướp/Trừ 5 điểm", type: 'IMMEDIATE', emoji: '👑', image: '/cards/7-cuop-quan.svg' },
    { id: 8, name: "EM BỊ TRỪ 3 ĐIỂM", desc: "-3 điểm", type: 'IMMEDIATE', emoji: '😔', image: '/cards/8-em-bi-tru.svg' },
    { id: 9, name: "PHIẾU BÉ NGOAN", desc: "+5 điểm", type: 'IMMEDIATE', emoji: '🎁', image: '/cards/9-phieu-be-ngoan.svg' },
    { id: 10, name: "ĂN KẾ TIẾP", desc: "Ăn ô kế tiếp", type: 'IMMEDIATE', emoji: '🍽️', image: '/cards/10-an-bat-chap.svg' },
    { id: 11, name: "ÔI THÔI CHỚTTT", desc: "Đặt bẫy -5", type: 'HOLD', emoji: '⚠️', image: '/cards/11-oi-thoi.svg' },
    { id: 12, name: "MÀI CHỚT CHƯA CON", desc: "Đặt bẫy -3", type: 'HOLD', emoji: '⚠️', image: '/cards/12-mai-chot.svg' },
    { id: 13, name: "CƠ HỘI LẬT KÈO", desc: "Trả lời câu hỏi", type: 'HOLD', emoji: '❓', image: '/cards/13-co-hoi-lat-keo.svg' },
    { id: 14, name: "ĐƯỢC ĂN CẢ NGÃ", desc: "Tung xúc sắc", type: 'HOLD', emoji: '🎲', image: '/cards/14-duoc-an-ca-nga.svg' },
    { id: 15, name: "ĐẬU TÚ TÀI", desc: "Chia đều đá", type: 'HOLD', emoji: '🌾', image: '/cards/15-dau-tu-tai.svg' },
    { id: 16, name: "STOP", desc: "Hủy bỏ lá bài", type: 'HOLD', emoji: '🛑', image: '/cards/16-stop.svg' }
  ];

  const rules = [
    {
      title: "👥 Mục đích trò chơi",
      content: "Là một trò chơi truyền thống của Việt Nam, Ô Ăn Quan được chơi bởi 2 người với 12 ô (gọi là 'ô') và 2 kho (gọi là 'kho' hay 'quan'). Mục tiêu là thu thập được nhiều điểm nhất."
    },
    {
      title: "🎯 Cách chơi cơ bản",
      content: "Mỗi người sẽ lần lượt rải đá từ một ô, đá sẽ được rải sang các ô liền kề theo chiều. Nếu ô cuối cùng rơi vào ô của bạn, bạn được ăn những ô từ ô đó trở lại cho đến khi gặp ô trống."
    },
    {
      title: "💎 Thẻ chức năng",
      content: "Có 16 loại thẻ chia thành 2 loại: DÙNG NGAY (10 loại) và CÓ THỂ ĐỂ DÀNH (6 loại). Mỗi thẻ có tác dụng riêng như cộng/trừ điểm, thêm lượt, đặt bẫy, v.v."
    },
    {
      title: "⏱️ Thời gian và lượt",
      content: "Mỗi người chơi có 30 giây để thực hiện lượt của mình. Nếu hết thời gian, lượt sẽ tự động chuyển sang người chơi khác."
    },
    {
      title: "🏆 Chiến thắng",
      content: "Trò chơi kết thúc khi bộ đếm đạt đủ lượt (thường là vài lượt). Người chơi có điểm cao nhất là người chiến thắng!"
    }
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-40">
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-20 right-0 w-96 sm:w-[28rem] lg:w-[32rem] bg-white rounded-[20px] sm:rounded-[30px] shadow-2xl border-4 sm:border-6 border-amber-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl font-black">📖 CÁCH CHƠI</h2>
            <p className="text-xs sm:text-sm opacity-90 mt-1">Hướng dẫn chi tiết Ô Ăn Quan</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b-2 border-amber-300 bg-amber-50">
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex-1 py-3 px-4 font-bold text-sm sm:text-base transition-all ${
                activeTab === 'rules'
                  ? 'bg-amber-600 text-white border-b-4 border-amber-700'
                  : 'text-amber-900 hover:bg-amber-100'
              }`}
            >
              📋 Luật Chơi
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex-1 py-3 px-4 font-bold text-sm sm:text-base transition-all ${
                activeTab === 'cards'
                  ? 'bg-amber-600 text-white border-b-4 border-amber-700'
                  : 'text-amber-900 hover:bg-amber-100'
              }`}
            >
              🎴 Thẻ Chức Năng
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-white to-amber-50">
            {activeTab === 'rules' ? (
              <div className="space-y-4 sm:space-y-5">
                {rules.map((rule, idx) => (
                  <div key={idx} className="border-l-4 border-amber-600 pl-3 sm:pl-4">
                    <h3 className="font-black text-sm sm:text-base text-amber-900 mb-1 sm:mb-2">
                      {rule.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {rule.content}
                    </p>
                  </div>
                ))}

                {/* Tips */}
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 sm:p-4 mt-4 sm:mt-5">
                  <h3 className="font-black text-sm text-yellow-900 mb-2">💡 Mẹo chơi</h3>
                  <ul className="text-xs sm:text-sm text-yellow-900 space-y-1">
                    <li>• Đặt bẫy ở các vị trí chiến lược</li>
                    <li>• Quản lý thẻ giữ lại một cách thông minh</li>
                    <li>• Chú ý đến lượt của đối phương</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border-2 border-amber-200 cursor-pointer group"
                  >
                    {/* Card Image */}
                    <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 aspect-[2/3] flex items-center justify-center overflow-hidden">
                      {card.image ? (
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-4xl mb-2">{card.emoji}</span>
                          <span className="text-xs font-bold text-amber-800 text-center px-2">
                            {card.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Info */}
                    <div className="p-2 sm:p-3 bg-white border-t border-amber-100">
                      <p className="text-xs font-bold text-amber-900 mb-1 line-clamp-2">
                        {card.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-700 line-clamp-2">
                        {card.desc}
                      </p>
                      <span
                        className={`inline-block text-[10px] font-bold mt-1 px-2 py-1 rounded ${
                          card.type === 'IMMEDIATE'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {card.type === 'IMMEDIATE' ? '⚡ DÙNG NGAY' : '💾 ĐỂ DÀNH'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-amber-100 p-2 sm:p-3 text-center border-t border-amber-300">
            <p className="text-[10px] sm:text-xs font-black text-amber-900 uppercase">
              Ô Ăn Quan - Trò chơi truyền thống Việt Nam
            </p>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24
          rounded-full
          flex items-center justify-center
          font-black text-2xl sm:text-3xl lg:text-4xl
          shadow-xl
          transition-all
          active:scale-90
          ${isOpen 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-amber-600 hover:bg-amber-700 text-white hover:scale-110'
          }
        `}
        title="Cách chơi"
      >
        {isOpen ? '✕' : '?'}
      </button>
    </div>
  );
};

export default Instructions;
