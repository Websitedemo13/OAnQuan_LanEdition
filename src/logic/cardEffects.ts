import type { GameCard } from '../data/cards';

export type GameState = {
  board: number[];
  scores: { p1: number; p2: number };
  isP1Turn: boolean;
  trapCards?: { [key: number]: number }; // slot -> cardId
  diceRolls?: number[]; // for dice games
  cardToStore?: number; // card to be stored/used later
};

export type CardEffectResult = {
  newBoard: number[];
  newScores: { p1: number; p2: number };
  skipNextTurn?: boolean;
  extraTurns?: number;
  requiresAction?: 'TRAP_PLACEMENT' | 'DICE_ROLL' | 'QUESTION' | 'STONE_PLACEMENT' | 'NONE';
  actionData?: any;
  console_log?: string;
};

/**
 * Apply card effect and return modified game state
 * Some effects require additional UI interaction and are marked with requiresAction
 */
export const applyCardEffect = (
  card: GameCard,
  state: GameState
): CardEffectResult => {
  const newBoard = [...state.board];
  const newScores = { ...state.scores };
  const currentPlayer: 'p1' | 'p2' = state.isP1Turn ? 'p1' : 'p2';
  const opponent: 'p1' | 'p2' = state.isP1Turn ? 'p2' : 'p1';

  let skipNextTurn = false;
  let extraTurns = 0;
  let requiresAction: CardEffectResult['requiresAction'] = 'NONE';
  let actionData: any = null;
  let logMsg = '';

  switch (card.id) {
    case 1: { // NGON THÍIII - Ô cuối ăn được X2
      // Xử lý trong executeMove - khi ăn ô cuối, điểm được nhân 2
      logMsg = 'Card NGON THÍIII - ô cuối ăn được sẽ X2 (xử lý trong executeMove)';
      break;
    }

    case 2: { // HỒNG NHAN BẠC PHẬN - Bị trừ 4 điểm
      newScores[currentPlayer] = Math.max(0, newScores[currentPlayer] - 4);
      logMsg = `Card HỒNG NHAN BẠC PHẬN - ${currentPlayer} trừ 4 điểm`;
      break;
    }

    case 3: { // CÒN GÌ ĐẸP HƠN - Thêm 1 lượt
      extraTurns = 1; // Player gets to play again
      logMsg = 'Card CÒN GÌ ĐẸP HƠN - được thêm 1 lượt';
      break;
    }

    case 4: { // VÌ EM XỨNG ĐÁNG - Cộng 2 điểm
      newScores[currentPlayer] += 2;
      logMsg = `Card VÌ EM XỨNG ĐÁNG - ${currentPlayer} cộng 2 điểm`;
      break;
    }

    case 5: { // XÀ CÀ NU - Mất 1 lượt
      skipNextTurn = true;
      logMsg = `Card XÀ CÀ NU - ${currentPlayer} sẽ mất lượt tiếp theo`;
      break;
    }

    case 6: { // RỤNG ĐÁ - Đối phương rải 5 đá
      // Kiểm tra kho của đối phương (tính cả thẻ điểm + đá trên bàn)
      const oppStones = newBoard.slice(state.isP1Turn ? 6 : 0, state.isP1Turn ? 11 : 5)
        .reduce((a, b) => a + b, 0);
      const totalOppValue = newScores[opponent] + oppStones;

      logMsg = `Card RỤNG ĐÁ - Kho đối phương: ${totalOppValue}`;

      if (totalOppValue < 9) {
        logMsg += ' (< 9, không rải)';
        break;
      }

      // Rải 5 đá vào 5 ô của đối phương
      const oppSlots = state.isP1Turn ? [6, 7, 8, 9, 10] : [0, 1, 2, 3, 4];
      oppSlots.forEach(idx => {
        if (newBoard[idx] > 0) newBoard[idx]--;
        // Đá được rải từ kho, trừ điểm
      });
      newScores[opponent] = Math.max(0, newScores[opponent] - 5);
      logMsg += ' - rải 5 đá';

      // Nếu kho > 20 thì rải thêm 2 ô quan mỗi ô 1 đá
      if (totalOppValue > 20) {
        const quanSlots = state.isP1Turn ? [5, 11] : [5, 11];
        quanSlots.forEach(idx => {
          if (newBoard[idx] > 0) newBoard[idx]--;
        });
        logMsg += ', rải thêm 2 quan';
      }
      break;
    }

    case 7: { // CƯỚP QUAN - Cướp quan của đối phương
      const p1QuanIdx = 5;
      const p2QuanIdx = 11;
      const oppQuanIdx = state.isP1Turn ? p2QuanIdx : p1QuanIdx;
      const myQuanIdx = state.isP1Turn ? p1QuanIdx : p2QuanIdx;

      if (newBoard[oppQuanIdx] > 0) {
        // Đối phương đã ăn quan - cướp toàn bộ
        const quanCount = newBoard[oppQuanIdx];
        newBoard[myQuanIdx] += quanCount;
        newBoard[oppQuanIdx] = 0;
        logMsg = `Card CƯỚP QUAN - cướp ${quanCount} quan từ đối phương`;
      } else {
        // Đối phương chưa ăn quan - trừ 5 điểm
        newScores[currentPlayer] = Math.max(0, newScores[currentPlayer] - 5);
        logMsg = 'Card CƯỚP QUAN - đối phương chưa ăn quan, trừ 5 điểm';
      }
      break;
    }

    case 8: { // EM BỊ TRỪ 3 ĐIỂM - Trừ 3 điểm
      newScores[currentPlayer] = Math.max(0, newScores[currentPlayer] - 3);
      logMsg = `Card EM BỊ TRỪ 3 ĐIỂM - ${currentPlayer} trừ 3 điểm`;
      break;
    }

    case 9: { // PHIẾU BÉ NGOAN - Cộng 5 điểm
      newScores[currentPlayer] += 5;
      logMsg = `Card PHIẾU BÉ NGOAN - ${currentPlayer} cộng 5 điểm`;
      break;
    }

    case 10: { // ĂN BẤT CHẤP - Ăn ô tiếp theo
      // Xử lý trong executeMove - ăn ô liền sau hành động rải đá
      logMsg = 'Card ĂN BẤT CHẤP - được ăn ô kế tiếp (xử lý trong executeMove)';
      break;
    }

    case 11: { // ÔI THÔI CHỚTTT - Đặt bẫy -5 điểm
      requiresAction = 'TRAP_PLACEMENT';
      actionData = { trapPenalty: 5 };
      logMsg = 'Card ÔI THÔI CHỚTTT - chọn ô để đặt bẫy (-5 điểm)';
      break;
    }

    case 12: { // MÀI CHỚT CHƯA CON - Đặt bẫy -3 điểm
      requiresAction = 'TRAP_PLACEMENT';
      actionData = { trapPenalty: 3 };
      logMsg = 'Card MÀI CHỚT CHƯA CON - chọn ô để đặt bẫy (-3 điểm)';
      break;
    }

    case 13: { // CƠ HỘI LẬT KÈO - Trả lời câu hỏi
      requiresAction = 'QUESTION';
      actionData = { difficulty: 'HARD' };
      logMsg = 'Card CƠ HỘI LẬT KÈO - trả lời câu hỏi (đúng +3 lượt, sai -10 điểm)';
      break;
    }

    case 14: { // ĐƯỢC ĂN CẢ NGÃ THÌ THUA - Lắc xúc xắc
      requiresAction = 'DICE_ROLL';
      actionData = { rolls: 3 };
      logMsg = 'Card ĐƯỢC ĂN CẢ NGÃ THÌ THUA - lắc 3 lần xúc xắc';
      break;
    }

    case 15: { // ĐẬU TÚ TÀI - Rải 5 đá
      requiresAction = 'STONE_PLACEMENT';
      actionData = { stoneCount: 5, canChooseTarget: true };
      logMsg = 'Card ĐẬU TÚ TÀI - chọn ô để rải 5 đá (5 ô mình hoặc 5 ô đối phương)';
      break;
    }

    case 16: { // STOP - Dừng tác dụng thẻ
      logMsg = 'Card STOP - dừng tác dụng của thẻ chức năng đối phương';
      // Xử lý bên ngoài - cần biết thẻ nào bị hủy
      break;
    }

    default:
      logMsg = `Unknown card ID: ${card.id}`;
  }

  return {
    newBoard,
    newScores,
    skipNextTurn,
    extraTurns,
    requiresAction,
    actionData,
    console_log: logMsg
  };
};

/**
 * Handle dice roll result for specific cards
 */
export const handleDiceRollResult = (
  cardId: number,
  rolls: number[],
  state: GameState
): CardEffectResult => {
  const newScores = { ...state.scores };
  const newBoard = [...state.board];
  const currentPlayer: 'p1' | 'p2' = state.isP1Turn ? 'p1' : 'p2';

  const total = rolls.reduce((a, b) => a + b, 0);
  let logMsg = `Xúc xắc: ${rolls.join(', ')} = ${total}`;

  if (cardId === 14) { // ĐƯỢC ĂN CẢ NGÃ THÌ THUA
    if (total <= 10) {
      newScores[currentPlayer] = Math.max(0, newScores[currentPlayer] - 10);
      logMsg += ' (≤10) - trừ 10 điểm';
    } else {
      // Đổi kho (score swap)
      const temp = newScores.p1;
      newScores.p1 = newScores.p2;
      newScores.p2 = temp;
      logMsg += ' (>11) - đổi kho';
    }
  }

  return {
    newBoard,
    newScores,
    requiresAction: 'NONE',
    console_log: logMsg
  };
};

/**
 * Handle question result
 */
export const handleQuestionResult = (
  cardId: number,
  isCorrect: boolean,
  state: GameState
): CardEffectResult => {
  const newScores = { ...state.scores };
  const newBoard = [...state.board];
  const currentPlayer: 'p1' | 'p2' = state.isP1Turn ? 'p1' : 'p2';
  let extraTurns = 0;
  let logMsg = '';

  if (cardId === 13) { // CƠ HỘI LẬT KÈO
    if (isCorrect) {
      extraTurns = 3;
      logMsg = 'Card CƠ HỘI LẬT KÈO - ĐÚNG! Được +3 lượt';
    } else {
      newScores[currentPlayer] = Math.max(0, newScores[currentPlayer] - 10);
      logMsg = 'Card CƠ HỘI LẬT KÈO - SAI! Trừ 10 điểm';
    }
  }

  return {
    newBoard,
    newScores,
    extraTurns,
    requiresAction: 'NONE',
    console_log: logMsg
  };
};

/**
 * Handle trap placement
 */
export const handleTrapPlacement = (
  cardId: number,
  slotIndex: number,
  state: GameState
): CardEffectResult => {
  const newScores = { ...state.scores };
  const newBoard = [...state.board];
  const trapCards = { ...state.trapCards };

  let penalty = 3;
  if (cardId === 11) penalty = 5;

  trapCards[slotIndex] = cardId;
  const logMsg = `Card ${cardId === 11 ? 'ÔI THÔI CHỚTTT' : 'MÀI CHỚT CHƯA CON'} - đặt bẫy vào ô ${slotIndex} (-${penalty} điểm khi bốc)`;

  return {
    newBoard,
    newScores,
    requiresAction: 'NONE',
    console_log: logMsg,
    actionData: { trapCards }
  };
};

/**
 * Check if opponent landed on trap
 */
export const checkTrapActivation = (
  slotIndex: number,
  state: GameState
): CardEffectResult => {
  const trapCards = state.trapCards || {};
  const newScores = { ...state.scores };
  const newBoard = [...state.board];
  const currentPlayer: 'p1' | 'p2' = state.isP1Turn ? 'p1' : 'p2';
  let logMsg = '';

  if (trapCards[slotIndex]) {
    const trapCardId = trapCards[slotIndex];
    const penalty = trapCardId === 11 ? 5 : 3;

    newScores[currentPlayer] = Math.max(0, newScores[currentPlayer] - penalty);
    delete trapCards[slotIndex];

    logMsg = `Bốc vào bẫy! Trừ ${penalty} điểm`;
  }

  return {
    newBoard,
    newScores,
    requiresAction: 'NONE',
    console_log: logMsg,
    actionData: { trapCards }
  };
};
