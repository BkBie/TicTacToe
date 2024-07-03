# เกมส์ Tic Tac Toe
ตัวเกมส์ถูกสร้างในรูปแบบของ web game และเนื่องจากเป็นการทดลองสร้าง ไม่ได้มีการจัดการ component ที่มากมายจึงขอใช้เพียง node express ในการสร้าง
## ภาพรวม
- มีให้เลือกจำนวนช่องที่ต้องการเล่น เช่น 3x3, 4x4, 5x5
- มีปุ่มสำหรับเลือกเล่นกับ AI
- มีปุ่มสำหรับการบันทึกการเล่นลงในฐานข้อมูล(เบื่องต้นถูกปิดใช้งานการเชื่อมต่อ)
## SETUP
- Node.js version 20
```bash
git clone https://github.com/BkBie/TicTacToe.git
cd TicTacToe
npm install
```
## run
```bash
npm start
```
## Minimax Algorithm
Minimax algorithm เป็นอัลกอริธึมที่ใช้ในการสร้าง AI สำหรับเกมแบบสองผู้เล่นที่ต้องการหากลยุทธ์ที่ดีที่สุดในการเล่นเกมที่มีลักษณะเป็นการแข่งขันกัน อัลกอริธึมนี้จะพยายามหา "การเดิน" ที่จะทำให้คะแนนสูงที่สุดสำหรับผู้เล่นหนึ่ง และต่ำที่สุดสำหรับคู่แข่ง
หลักการทำงานของ Minimax algorithm ได้แก่
1. Recursive Exploration: สำรวจสถานะของเกมทั้งหมดที่เป็นไปได้จากการเดินในปัจจุบันจนกระทั่งถึงสถานะที่เกมจบลง (win, lose, draw)
2. Assign Scores: ให้คะแนนกับแต่ละสถานะเกม (win = +1, lose = -1, draw = 0)
3. Minimizing and Maximizing: ผู้เล่นจะเลือกการเดินที่ให้คะแนนสูงที่สุด (maximizing) และคู่แข่งจะเลือกการเดินที่ให้คะแนนต่ำที่สุด (minimizing)
4. Backpropagate Scores: คำนวณคะแนนที่ดีที่สุดจากการเดินแต่ละครั้งโดยใช้หลักการ Minimax.

## Design
![image](https://github.com/BkBie/TicTacToe/assets/97974775/d1e6898b-9dcf-49eb-a20a-9082196d779a)

