export interface GameCard {
  id: number;
  name: string;
  desc: string;
  type: 'IMMEDIATE' | 'HOLD';
  emoji: string;
  color: string;
  image?: string;
}

export const GAME_CARDS: { IMMEDIATE: GameCard[]; HOLD: GameCard[] } = {
  IMMEDIATE: [
    { 
      id: 1, 
      name: "NGON THÍIII", 
      desc: "Ô cuối cùng bạn ăn được trong lượt đó sẽ được X2 (nếu lượt bốc không ăn thì vô tác dụng)", 
      type: 'IMMEDIATE', 
      emoji: '✨', 
      color: 'from-yellow-400 to-yellow-600', 
      image: '/Ngon Thíiii.png' 
    },
    { 
      id: 2, 
      name: "HỒNG NHAN BẠC PHẬN", 
      desc: "Bạn bị trừ 4 điểm", 
      type: 'IMMEDIATE', 
      emoji: '💔', 
      color: 'from-red-400 to-red-600', 
      image: '/hongnhanbacphan.png' 
    },
    { 
      id: 3, 
      name: "CÒN GÌ ĐẸP HƠN", 
      desc: "Bạn được thêm 1 lượt rải đá", 
      type: 'IMMEDIATE', 
      emoji: '⚡', 
      color: 'from-blue-400 to-blue-600',
      image: '/congidephon.png' 
    },
    { 
      id: 4, 
      name: "VÌ EM XỨNG ĐÁNG", 
      desc: "Bạn được cộng 2 điểm", 
      type: 'IMMEDIATE', 
      emoji: '💝', 
      color: 'from-green-400 to-green-600', 
      image: '/viemxundang.png' 
    },
    { 
      id: 5, 
      name: "XÀ CÀ NU", 
      desc: "Bạn bị mất 1 lượt tiếp theo", 
      type: 'IMMEDIATE', 
      emoji: '🛑', 
      color: 'from-orange-400 to-orange-600', 
      image: '/xacanu.png' 
    },
    { 
      id: 6, 
      name: "RỤNG ĐÁ", 
      desc: "Đối phương phải bỏ ra 5 đá rải đều lên 5 ô. Nếu kho < 9: không rải. Nếu kho > 20: rải thêm 2 ô quan mỗi ô 1 đá", 
      type: 'IMMEDIATE', 
      emoji: '💧', 
      color: 'from-cyan-400 to-cyan-600', 
      image: '/rungda.png' 
    },
    { 
      id: 7, 
      name: "CƯỚP QUAN", 
      desc: "Nếu đối thủ ăn quan: cướp từ kho về kho mình. Nếu đối thủ chưa ăn quan: -5 điểm", 
      type: 'IMMEDIATE', 
      emoji: '👑', 
      color: 'from-purple-400 to-purple-600',
      image: '/cuopquan.png' 
    },
    { 
      id: 8, 
      name: "EM BỊ TRỪ 3 ĐIỂM THANH LỊch", 
      desc: "Bạn bị trừ 3 điểm", 
      type: 'IMMEDIATE', 
      emoji: '😢', 
      color: 'from-slate-400 to-slate-600', 
      image: '/thanhlich.png' 
    },
    { 
      id: 9, 
      name: "PHIẾU BÉ NGOAN", 
      desc: "Bạn được cộng 5 điểm", 
      type: 'IMMEDIATE', 
      emoji: '🌟', 
      color: 'from-lime-400 to-lime-600', 
      image: '/phieubengoan.png' 
    },
    { 
      id: 10, 
      name: "ĂN BẤT CHẤP", 
      desc: "Bạn được ăn luôn ô kế tiếp theo chiều rải đá (có thể ăn quan nếu đủ điều kiện)", 
      type: 'IMMEDIATE', 
      emoji: '😋', 
      color: 'from-pink-400 to-pink-600' ,
      image: '/anbatchap.png' 
    }
  ],
  HOLD: [
    { 
      id: 11, 
      name: "ÔI THÔI CHỚTTT", 
      desc: "Đặt bẫy vào 1 ô bất kỳ trong 5 ô mình. Đối phương bốc vào: cầm về thẻ + trừ 5 điểm", 
      type: 'HOLD', 
      emoji: '🪤', 
      color: 'from-red-500 to-red-700', 
      image: '/Ôi Thôi Chớttt.png' 
    },
    { 
      id: 12, 
      name: "MÀI CHỚT CHƯA CON", 
      desc: "Đặt bẫy vào 1 ô bất kỳ trong 5 ô mình. Đối phương bốc vào: cầm về thẻ + trừ 3 điểm", 
      type: 'HOLD', 
      emoji: '⚠️', 
      color: 'from-yellow-500 to-yellow-700', 
      image: '/Mài Chớt Chưa Con.png' 
    },
    { 
      id: 13, 
      name: "CƠ HỘI LẬT KÈO", 
      desc: "Trả lời câu hỏi trắc nghiệm siêu khó (4 ý). Đúng: +3 lượt. Sai: -10 điểm", 
      type: 'HOLD', 
      emoji: '❓', 
      color: 'from-orange-500 to-orange-700',
      image: '/cohoilatkeo.png' 
    },
    { 
      id: 14, 
      name: "ĐƯỢC ĂN CẢ NGÃ THÌ THUA", 
      desc: "Lắc xúc xắc 3 lần. Tổng ≤10: -10 điểm. Tổng >11: đổi kho đối phương thành của mình", 
      type: 'HOLD', 
      emoji: '🎲', 
      color: 'from-purple-500 to-purple-700', 
      image: '/duocancangathithua.png' 
    },
    { 
      id: 15, 
      name: "ĐẬU TÚ TÀI", 
      desc: "Rải đều 5 đá vào 5 ô của mình hoặc 5 ô đối phương (thay đổi bàn cờ)", 
      type: 'HOLD', 
      emoji: '🎯', 
      color: 'from-green-500 to-green-700' ,
      image: '/nuocdihayday.png' 
    },
    { 
      id: 16, 
      name: "STOP", 
      desc: "Dừng tác dụng của thẻ chức năng kể cả lá STOP đối phương đang dùng", 
      type: 'HOLD', 
      emoji: '⏹️', 
      color: 'from-slate-500 to-slate-700', 
      image: '/stop.png' 
    }
  ]
};