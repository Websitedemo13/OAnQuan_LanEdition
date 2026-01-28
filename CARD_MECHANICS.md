# O Ăn Quan - Card Mechanics Documentation
## LÁ CHỨC NĂNG (Function Cards)

---

## 1️⃣ DÙNG NGAY (IMMEDIATE USE CARDS)

### Card 1: 🌟 NGON THÍIII
**ID:** 1 | **Type:** IMMEDIATE | **Color:** Yellow

**Effect:**
- Ô cuối cùng bạn ăn được trong lượt đó sẽ được **X2 điểm**
- ⚠️ **Nếu lượt bốc không có ăn**, lá này **vô tác dụng**

**Implementation:** Handled in `executeMove()` - when a player eats the final square in their turn, multiply captured points by 2

---

### Card 2: 💔 HỒNG NHAN BẠC PHẬN
**ID:** 2 | **Type:** IMMEDIATE | **Color:** Red

**Effect:**
- Bạn bị **trừ 4 điểm**

**Implementation:** Direct score reduction in `applyCardEffect()`

---

### Card 3: ⚡ CÒN GÌ ĐẸP HƠN
**ID:** 3 | **Type:** IMMEDIATE | **Color:** Blue

**Effect:**
- Bạn được **thêm 1 lượt rải đá**
- Người chơi sẽ được chơi lại mà không chuyển lượt cho đối phương

**Implementation:** `extraTurns = 1` - handled in App.tsx to keep current turn

---

### Card 4: 💝 VÌ EM XỨNG ĐÁNG
**ID:** 4 | **Type:** IMMEDIATE | **Color:** Green

**Effect:**
- Bạn được **cộng 2 điểm**

**Implementation:** Direct score increase in `applyCardEffect()`

---

### Card 5: 🛑 XÀ CÀ NU
**ID:** 5 | **Type:** IMMEDIATE | **Color:** Orange

**Effect:**
- Bạn bị **mất 1 lượt tiếp theo**

**Implementation:** `skipNextTurn = true` - handled in App.tsx to skip next turn

---

### Card 6: 💧 RỤNG ĐÁ
**ID:** 6 | **Type:** IMMEDIATE | **Color:** Cyan

**Effect:**
- Đối phương phải **bỏ ra 5 đá rải đều lên 5 ô của họ**

**Conditions:**
- ❌ **Nếu kho của đối phương < 9**: không phải rải
- ✅ **Nếu kho >= 9**: rải 5 đá vào 5 ô của họ, trừ 5 điểm
- 🔥 **Nếu kho > 20**: rải thêm 2 ô quan, mỗi ô 1 đá

**Calculation:** Kho = điểm hiện tại + số đá trên bàn (tính cả quan)

---

### Card 7: 👑 CƯỚP QUAN
**ID:** 7 | **Type:** IMMEDIATE | **Color:** Purple

**Effect:**
- **Nếu đối thủ đã ăn quan**: Cướp từ kho đối thủ về kho mình
  - Nếu đối thủ ăn 2 quan → cướp cả 2 quan
  - Nếu đối thủ ăn 1 quan → cướp 1 quan
- **Nếu đối thủ chưa ăn quan**: Bạn bị **trừ 5 điểm**

**Implementation:** Check if opponent's quan box has stones

---

### Card 8: 😢 EM BỊ TRỪ 3 ĐIỂM THANH LỊch
**ID:** 8 | **Type:** IMMEDIATE | **Color:** Slate

**Effect:**
- Bạn bị **trừ 3 điểm**

**Implementation:** Direct score reduction in `applyCardEffect()`

---

### Card 9: 🌟 PHIẾU BÉ NGOAN
**ID:** 9 | **Type:** IMMEDIATE | **Color:** Lime

**Effect:**
- Bạn được **cộng 5 điểm**

**Implementation:** Direct score increase in `applyCardEffect()`

---

### Card 10: 😋 ĂN BẤT CHẤP
**ID:** 10 | **Type:** IMMEDIATE | **Color:** Pink

**Effect:**
- Bạn được **ăn luôn ô kế tiếp** theo chiều rải đá
- Có thể ăn quan nếu **đủ điều kiện** (quan >= 4 đá)
- Ăn bất cứ ô nào liền sau hành động hiện tại

**Implementation:** Handled in `executeMove()` - auto-capture next square if conditions met

---

## 2️⃣ CÓ THỂ DÙNG LIỀN HOẶC ĐỂ DÀNH (HOLD/TRAP CARDS)

### Card 11: 🪤 ÔI THÔI CHỚTTT
**ID:** 11 | **Type:** HOLD | **Color:** Red

**Effect:**
- Đặt thẻ này vào **1 ô bất kỳ trong 5 ô bên mình** (cài bẫy)
- Khi **đối phương bốc vào ô đó**:
  - Cầm về thẻ này
  - **Bị trừ 5 điểm**

**Placement:** Player chooses one of 5 squares to place trap

**Activation:** When opponent lands on that square during their turn

---

### Card 12: ⚠️ MÀI CHỚT CHƯA CON
**ID:** 12 | **Type:** HOLD | **Color:** Yellow

**Effect:**
- Đặt thẻ này vào **1 ô bất kỳ trong 5 ô bên mình** (cài bẫy)
- Khi **đối phương bốc vào ô đó**:
  - Cầm về thẻ này
  - **Bị trừ 3 điểm**

**Placement:** Player chooses one of 5 squares to place trap

**Activation:** When opponent lands on that square during their turn

---

### Card 13: ❓ CƠ HỘI LẬT KÈO
**ID:** 13 | **Type:** HOLD | **Color:** Orange

**Effect:**
- Bạn phải **trả lời 1 câu hỏi trắc nghiệm siêu khó** (gồm 4 ý)
- **Trả lời ĐÚNG**: Được đi thêm **+3 lượt**
- **Trả lời SAI**: Bị **trừ 10 điểm**

**Implementation:** `handleQuestionResult()` - handled in UI for question display

---

### Card 14: 🎲 ĐƯỢC ĂN CẢ NGÃ THÌ THUA
**ID:** 14 | **Type:** HOLD | **Color:** Purple

**Effect:**
- Bạn sẽ được **lắc xúc xắc 3 lần**
- **Tổng 3 lần ≤ 10**: Bạn bị **trừ 10 điểm**
- **Tổng 3 lần > 11**: Bạn sẽ có **quyền đổi kho** của đối phương **thành của mình**

**Implementation:** `handleDiceRollResult()` - roll 3 dice, compare total

---

### Card 15: 🎯 ĐẬU TÚ TÀI
**ID:** 15 | **Type:** HOLD | **Color:** Green

**Effect:**
- Được quyền **rải đều 5 đá vào 5 ô** của mình **HOẶC 5 ô của đối phương**
- Mục đích: **Thay đổi số đá trên bàn cờ**
  - Để **mở cơ hội ăn** cho mình
  - Hoặc **chặn cơ hội ăn** của đối thủ

**Placement:** Player chooses either their own 5 squares or opponent's 5 squares

**Distribution:** Evenly distribute 5 stones across chosen squares

---

### Card 16: ⏹️ STOP
**ID:** 16 | **Type:** HOLD | **Color:** Slate

**Effect:**
- **Dừng tác dụng** của **thẻ chức năng** đối phương
- Có thể **dừng cả lá STOP** đối phương đang dùng

**Implementation:** Used to cancel opponent's card effects (requires card tracking)

---

## 📊 CARD CATEGORIES

### IMMEDIATE CARDS (10 Cards - ID 1-10)
Cards that take effect immediately when drawn. Effect is automatic except for cards requiring special actions.

### HOLD CARDS (6 Cards - ID 11-16)
Cards that can be used immediately or saved for later strategic use. Some require player interaction (placement, dice rolling, questions).

---

## 🎮 GAME STATE EXTENSIONS

### Required State Properties
```typescript
{
  board: number[],           // 12 slots (0-4: P1, 5: P1 quan, 6-10: P2, 11: P2 quan)
  scores: { p1, p2 },       // Current scores
  isP1Turn: boolean,        // Current turn
  trapCards?: {},           // Trap card positions: { slotIndex: cardId }
  skipNextTurn?: boolean,   // For XÀ CÀ NU card
}
```

---

## 🔧 CARD EFFECT HANDLING

### Direct Effects
- Cards 2, 4, 8, 9: Simple score modifications

### Turn Modification
- Card 3: Extra turn (don't switch player)
- Card 5: Skip next turn

### Opponent Effects
- Card 6: Opponent spreads stones
- Card 7: Capture opponent quan or penalty

### Conditional Effects
- Card 1: Only works if player ate a square
- Card 10: Only works if next square is available

### Interaction-Required Effects
- Cards 11, 12: Trap placement UI needed
- Card 13: Question answering UI needed
- Card 14: Dice rolling UI needed
- Card 15: Stone placement UI needed

---

## 📝 NOTES FOR DEVELOPERS

1. **Card ID Mapping:**
   - IDs 1-10: IMMEDIATE cards
   - IDs 11-16: HOLD cards

2. **Network Sync:**
   - All card effects must be broadcast to opponent
   - Trap positions must be maintained in game state
   - Skip turn status must be synced

3. **UI Implementation Needed:**
   - Trap placement selector (cards 11, 12)
   - Question modal (card 13)
   - Dice roller (card 14)
   - Stone placement selector (card 15)

4. **Edge Cases:**
   - Card 1 with 0 capture = no effect
   - Card 6 with opponent storage < 9 = no effect
   - Card 7 with 0 quan = -5 penalty
   - Card 14: >= 11 or > 11? Currently implemented as > 11

5. **Future Enhancements:**
   - Add proper question database for card 13
   - Implement visual dice animation for card 14
   - Add trap visualization on board
   - Implement STOP card chain tracking
