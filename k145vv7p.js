/*
 * Copyright (c) 2023-2025 Dmitry Romanchenko.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// Этот файл содержит дампы ПЗУ БИС К145ВВ7П.
// Данная БИС применялись в советском калькуляторе "Электроника МК-59".
// Дампы созданы на основе анализа фотографий кристалла этой БИС,
// опубликованных на сайте "Радиокартинки" https://radiopicture.listbb.ru 


// Память комманд (диодная матрица)
// Организация памяти: 64 строки по 38 столбцов
// Память содержит 128 команд и делится на 2 области - младшую (адреса с 0 по 63) и старшую (адреса с 64 по 127)
// Наличие диода - '+', отсутствие диода - '-'
// Строка состоит из 19 блоков по 2 диода. Каждый блок кодирует 1 бит команды. 
// Первый диод в блоке кодирует младшую область команд, втрой старшую.

// Организация строки:
// |М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С|М С| - область команд (младшая, старшая)
// |- +|+ +|- +|- +|+ +|+ -|- +|- +|+ +|- +|- +|+ +|- +|+ +|+ +|+ +|+ -|- +|- +| - строка
// | 4 | 3 | 2 | 1 | 0 |   | 0 | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | - номер бита в поле команды
// |-------------------|   |-----------|-----------|---------------------------| 
// |        АСП        |МОД|    КОМ    |    КУС    |            АП             | - поля команды
// Поля команды:
// АСП - адрес синхропрограммы (5 бит - адресует 32 синхропрограммы)
// МОД - модификатор команды (1 бит, разрешает/запрещает запись в регистр R и отображение на дисплее)
// КОМ - регистр режима выполнения синхропрограммы (3 бита - 8 режимов)
// КУС - регистр ветвления (3 бита, определяет режим вычисления адреса следующей команды)
// АП  - адрес программного перехода (6 бит, используется при вычислении адреса следующей команды)

const COMMANDS_VV7P = 
    "+-----+++-++-----+-++-+-+++--+--++-+-+"+
    "---+--+---+--+++----++-+++---++----+++"+
    "+-+----+--+-+-+--+--+-+++-+-----+++---"+
    "--+++++---++---++-----++++--++++-+----"+
    "----------++----+++----+++-+++--+++--+"+
    "-+--+------+-+-++-+---+--+-----+++-+-+"+
    "+-+----+-+++---++-+---++-+-+-++--+++++"+
    "-+------+-++-+++-----++++------+++--+-"+
    "-+-+-----+-+----++--+++++++-++-+++--++"+
    "-++----+---++-++-------++++-+-----++-+"+
    "-----+----+-+-+-++++---+--+-+---++----"+
    "-------+-++++-+-++----+---+-+++--+-++-"+
    "++--++-++-+++--++--+--+---+++++-+-+++-"+
    "++------+-++----++--+--+----+--+++----"+
    "+--++--++-++---+----+--+---+++-+-++-++"+
    "--+-+-+---+--+-+-+-+++-+-+-+--++++++++"+
    "----+-+--+++-+-++---+--+-----++++---++"+
    "-++-+-+-+-++-+-++----+-+--++-+++----+-"+
    "---+++----++-----+--+--+-+--+-+--+++--"+
    "--++--+-+-++-----+-+--+++-----++-++-+-"+
    "-----------+-+-+++-++-+-++++--+--+-++-"+
    "------+---++-+-+++--+----++++-+----+-+"+
    "-+++-+--++++--+------+++-++++++++-++++"+
    "-++--+--+-++-----++--+-+++-+-+-++--+-+"+
    "-----+--+-++----+--++--+----+-++-++-+-"+
    "--+++-----++----+------+--+-+-++------"+
    "-++--+--+-++----+-+---++-++-+---+-----"+
    "+----+--+++--+-+-----+++--+---++-+++++"+
    "+-------++++---++----++--++-++-+++-+-+"+
    "--+-+-----++-+-++++---++-++-----------"+
    "-+--+++---+----+----+--+----++-+-++-+-"+
    "++++-+++-+++--+----+--++-----+-----+-+"+
    "--+-++++--++--+----+---++------+-+--++"+
    "-----+-+-+++-+++---++---+++------++---"+
    "+-----+--++++--++-----++++-+--+-++----"+
    "-+---+--++++---++----+++-++-+-----+-+-"+
    "--+----+--+++--++-----++++++-+-+++--++"+
    "----+--+-+--++++--+--+++--++-+-+-+-+--"+
    "---+-+-+-++++-+-+----++++-+-+----++-++"+
    "--------+-++-+-+++--++---+++-++-+-----"+
    "-++++---+--++-+--+--++++--+-++-+++++++"+
    "---++---+-++------+----+--+++--+---+--"+
    "-+--+--++-+++---+-----+++-++-++--++++-"+
    "+-+----++++--+-+---+--+++-----+--+----"+
    "--+---+-++-+----++--+-+-+--+--+++---++"+
    "+-+----++-+-+---++---++++--+-+-++++-+-"+
    "--+++--++-++---------+++++++-+-++-++++"+
    "+-+-+--+--++-----++---+++---+-++-++-+-"+
    "---++-++--++---+--+----+---+--+-+---++"+
    "---+--+-++++--+--+-+--+---++++++-++--+"+
    "-+--+---+--++-+-----+-++-----++-+++-+-"+
    "-+-------++++-+--+-+--+++++--+--+++--+"+
    "-+-+---++-++-+---+----+++--++-++-+-++-"+
    "+-----+-+---+---++-+---++++-++---+-++-"+
    "-++-++-++-++-+--++---++-+---++++++-+--"+
    "-+++-++---++---+------++++--+----+-+++"+
    "++++-++++-+++-+-----+-++-+-+++-+++++--"+
    "+---++++-+++-+-++---++++-+----+-++-+--"+
    "++-+--++++++-+---++--++-+++-+-+--+++--"+
    "-----------+-----++-+---++++--+++-+-++"+
    "-++--+++++++-----+----++++-+--+---+--+"+
    "+---+-+-+-++-+-+-+----+--++++++++---++"+
    "----+++-+-+-+---++++---+--+---+-+++-+-"+
    "-+-----+--+++-+++-+----+--+--+--+++--+"

// Память синхропрограмм (диодная матрица)
// Наличие диода - '+', отсутствие диода - '-'
// Организация памяти: 96 строк по 30 столбцов
// Память содержит 32 синхропрограммы. Синхропрограмма состоит из 6 групп по 3 адреса микрокоманд.
// Группа определяет какие микрокоманды выполняются в течение сигнала Дi. Соответствие между номером группы (6 групп) и индексом i (от 1 до 12)
// определяется полем КОМ из текущей команды. 3 адреса в группе определяют микрокоманды выполняемые в течение сигналов Е1, Е2 и Е3 соответственно.

// Организация строки:
// |+ - - - - -|+ - + - + -|- - - - - +|+ - + - - -|- - - - + +| - строка
// |4 1 6 3 5 2|2 5 3 6 1 4|2 5 3 6 1 4|2 5 3 6 1 4|2 5 3 6 1 4| - номер группы, к которой относится адрес микрокоманды
// |     4           3           2           1           0     | - индекс бита адреса микрокоманды

const SPROGS_VV7P = 
    "-++--+-----++---+-+---+-++-++-"+
    "---------+-----++----+---+----"+
    "-------+-+-+---+-----------+--"+
    "------+--+--+-----++---+-+-+-+"+
    "-------------+-+-+------++++++"+
    "---------------+--+++-+++++-++"+
    "+---++----+-++---++---+-----+-"+
    "------+-+-+-------+-+-+-------"+
    "-+--------+---+---------------"+
    "--+---+-----+--+-----------+--"+
    "---------+-----------------+--"+
    "------------------------------"+
    "-+----+--+--------------++--+-"+
    "-+---------+----+--+---+-+---+"+
    "++-++++-+-+--+----------+++-+-"+
    "----+-++--+-+---+-++--+-++--++"+
    "+-+-+--------+-------+-+--+---"+
    "--------------+---------------"+
    "+----------------+-------+-+-+"+
    "-------+-----------+-----+----"+
    "----+-------------+---+-+---++"+
    "-------+----+--+--------------"+
    "+--------------+--+----+++--+-"+
    "-+-----------------+--++------"+
    "--+---+-+++-+--++---------++--"+
    "-----++--+--+-----------+-----"+
    "-+---+-+---++--+---------++-++"+
    "---------+--++--+++---+----+--"+
    "-----+---------+----------+---"+
    "---+-------+-------------+-+--"+
    "-+-+++-------+----+-+-+-+-+-+-"+
    "++-+++------------------------"+
    "------+---+-+---+-------+---+-"+
    "--+---------+-+-+-+--++--+----"+
    "-+--+---++---+-+----+-+--+----"+
    "-+---++-+-+--------------++--+"+
    "-+-----+-+-++-+-------+-+-+---"+
    "------+---------+--+---++-----"+
    "--+--+---------------------++-"+
    "------------+-+---------+-+---"+
    "----------+-+++--+-+---++-+---"+
    "------+++-+------+---+---+-+--"+
    "--------------+-----------+---"+
    "+-----+-----+-----+----------+"+
    "---------+--------++++++------"+
    "+--+-+-+-++-+-+----+-+-+-+----"+
    "---+----+-----+---------+--+-+"+
    "--------+----+---+------------"+
    "++----------+-+--+----+-+-+--+"+
    "----+--------+-----+-----+----"+
    "-+-----+-+------++--++--------"+
    "-+-----------+-----+-----++-+-"+
    "-----------------------------+"+
    "---------------+-----+--++++-+"+
    "---------+---+-+---++----+----"+
    "----+-------------------------"+
    "------+-+-+-+-+-+-+---+-++--+-"+
    "+---++-+---+-+---+-----+-----+"+
    "------------+++-+++++-++------"+
    "---+---+-+-++-+-+-++++++------"+
    "-------------+---++--++-------"+
    "-------+----------+--++++---+-"+
    "------+---+-+---+-------++--++"+
    "--+-+--+-----+-----+-------+-+"+
    "------------------++++-+------"+
    "--+----+----+-++-+-+----+++--+"+
    "-----+---+-----+-----------+--"+
    "++---++---++---+----++-+--++-+"+
    "---+-+----+-------++++--+-+-+-"+
    "------+-+-----+---+++-++-+---+"+
    "-----++-+-+---------++------+-"+
    "--+-+-+-+------+--+-++-------+"+
    "---+-++-+++----+-----+--+-+-+-"+
    "--+-------+-+-+-+---+--+-+-+--"+
    "----+---------++----++-+--++--"+
    "---------+-------------------+"+
    "++-+-+-------+----------------"+
    "---+-++-+---+-++---+---+-+----"+
    "+-+---+-----+--------------+-+"+
    "-+------++-+-++----+-----++---"+
    "------+-+-------+++++------+--"+
    "------------+-+--+------+-++-+"+
    "-+---+-+----------+------+--+-"+
    "----------+-++--+-+----++-----"+
    "-------+---+------+---+++-+-++"+
    "---------+--++++-++++--+------"+
    "++-+-++++-++-+----------------"+
    "----------++-+----+++--+-+---+"+
    "----+--+----+-+--+-+----+++--+"+
    "---------+--------------+-----"+
    "-----+-----+-----++----+------"+
    "-------+++---+-+----------+--+"+
    "----+----+---+-----+-------+--"+
    "+----+-+-+--+-----+--------+--"+
    "+-++++++++-+------++++-+------"+
    "-++-+------+---+-++-+---+-+---"

// Память микрокоманд (диодная матрица)
// Наличие диода - '+', отсутствие диода - '-'
// Организация памяти: 32 строки по 18 столбцов
// Микрокоманда определяет набор микроприказов  
const UCMDS_VV7P = 
    "+-------+----++-++"+
    "++------+----++-++"+
    "+---------+-----++"+
    "+----------+-+-+-+"+
    "+------------+--++"+
    "++------++---+--++"+
    "+---------+--+--++"+
    "--------+---++--++"+
    "++-----------++-++"+
    "+------++----+--++"+
    "---+----+--+-+--++"+
    "----+------+-+--++"+
    "+-----+------+--++"+
    "++---------+-++-++"+
    "----+-----+--++-++"+
    "+-----+---+--+--++"+
    "+----------+-+--++"+
    "--------+--+++--++"+
    "----+---+----+--++"+
    "---+---+---+-+--++"+
    "+-------++---+--++"+
    "+---+---+--+-+--++"+
    "------+----+-++-++"+
    "++--------+--++-++"+
    "----+------+-++++-"+
    "---+-+----+--+--++"+
    "+-+-----+----+--++"+
    "+------++--+-+--++"+
    "---+--+---+-----++"+
    "-------++--+-+++++"+
    "-+--------+-----++"+
    "-----+----+-----++"

SEGMENTS_VV7P=
    "++++++++"+
    "-+++-++-"+
    "++-+++++"+
    "--++-+--"+
    "++++++++"+
    "--+--+-+"+
    "--+--+--"+
    "-++++++-"+
    "++++++++"+
    "--+----+"+
    "++++++-+"+
    "+-++----"+
    "++++++++"+
    "-++-++--"+
    "--+-----"+
    "--+---+-"

MNEMONICS_VV7P = [
    [ "",                       ""                     ],
    [ "R[-1]=S",                ""                     ],
    [ "M[+0]<=>S",              "M[+0]<=>S"            ],
    [ "R[+0]<=>S",              "S=R[+0]"              ],
    [ "S=0",                    "S=0"                  ],
    [ "R[-1]=S=S+L?0:10",       "S=S+L?0:10"           ],
    [ "S=M[+0]",                "S=M[+0]"              ],
    [ "LS=~R[+0]+S",            "LS=~R[+0]+S"          ],
    [ "R[-1]=0",                ""                     ],
    [ "S=0xF",                  "S=0xF"                ],
    [ "LS=R[+0]+S+L",           "LS=R[+0]+S+L"         ],
    [ "LS=R[+0]+1",             "LS=R[+0]+1"           ],
    [ "S=6",                    "S=6"                  ],
    [ "R[-1]=R[+0]",            ""                     ],
    [ "L=M[+0]==15",            "L=M[+0]==15"          ],
    [ "S=M[+0]+6",              "S=M[+0]+6"            ],
    [ "S=R[+0]",                "S=R[+0]"              ],
    [ "LS=S-1",                 "LS=S-1"               ],
    [ "LS=S+1",                 "LS=S+1"               ],
    [ "LS=R[+0]+~S+L",          "LS=R[+0]+~S+L"        ],
    [ "S=S+L?0:10",             "S=S+L?0:10"           ],
    [ "S=R[+0]+S+1",            "S=R[+0]+S+1"          ],
    [ "L=R[+0]+6",              "L=R[+0]+6"            ],
    [ "R[-1]=M[+0]",            ""                     ],
    [ "L=R[+0]+1;R[+0]=R[-3]",  "L=R[+0]+1"            ],
    [ "LS=R[+0]+M[+0]+L",       "LS=R[+0]+M[+0]+L"     ],
    [ "S=S+1-T",                "S=S+1-T"              ],
    [ "S=R[+0]-1",              "S=R[+0]-1"            ],
    [ "LS=M[+0]+6+L;M[+0]=S",   "LS=M[+0]+6+L;M[+0]=S" ],
    [ "L=R[+0]>0;R[+0]=0",      "L=R[+0]>0"            ],
    [ "LS=R[-1]=M[+0];M[+0]=S", "L=0;S<=>M[+0]"        ],
    [ "LS=R[+0]+M[+0];M[+0]=S", "LS=R+M[+0];M[+0]=S"   ]
];

COMMENTS_VV7P = [
    "PC = 0x4D", // 00
    "", // 01
    "", // 02
    "", // 03
    "Чтение кода клавиши. S <- номер столбца, PC = 04 | RV", // 04
    "", // 05
    "", // 06
    "Установка флага заполнения буфера R1.11 = (R0.10>0?0xF:0x09), M0.9 = S. Если M0.11 != 0xF, то PC = 0x4B, иначе PC = 0x03", // 07
    "Shifting left R2.7<-R0.7..R0.0<-S; R0.9 += 1;", // 08
    "", // 09
    "", // 0A
    "", // 0B
    "", // 0C
    "S = 0xF. Проверка флага заполнения буфера. Если R1.11 > 9, то PC = 0x46, иначе PC = 0x07", // 0D
    "Сдвиг влево S <- R1.7..R1.0 <- S. PC = 0x51", // 0E
    "", // 0F
    "Проверка старшего разряда (R0.7), позиции точки (S), R1.8: 0xF. Если R1.8+R0.7+(S==15?1:0) > 15, то PC = 0x12, иначе PC = 0x48", // 10
    "", // 11
    "Установка текущего символа (целая часть числа) S = R0.7, R2.8 = 0, PC = 0x0E", // 12
    "", // 13
    "", // 14
    "", // 15
    "Копирование Xl (R1.0..R1.7 <- M1.0..M1.7), установка пустого символа R1.8 = R2.8 = 0xF. PC = 0x79, RV = 0x79", // 16
    "", // 17
    "????? SP:1E R0.9 = 6, R1.9 = 0, R1.10 = R0.10, R0.10 <-> M1.10, PC = 0x18", // 18
    "Переход PC = 0x18", // 19
    "Проверка количества введённых цифр. Если R2.9 == 0xF, то PC = 0x7D, иначе PC = 0x0D", // 1A
    "", // 1B
    "????? SP:1E R0.9 = 6, R1.9 = 0, R1.10 = R0.10, R0.10 <-> M1.10, PC = 0x19", // 1C
    "Clearing YH (M1.0..M1.7 <- 0); Goto 0x66", // 1D
    "Copying XL to display register (R0.0..R0.7 <- R1.0..R1.7);", // 1E
    "", // 1F
    "", // 20
    "Сдвиг S <- M1.7-M1.0 <- S. PC = 36 | RV", // 21
    "", // 22
    "", // 23
    "Нажата клавиша ряда 1. Сохранение столбца клавиши R0.9 = R0.10 = R1.10 = S. PC = RV = 0x4A", // 24
    "Проверка занятости кольца. Если M0.9 == 0xF, то PC = 0x6F, иначе PC = 0x52", // 25
    "", // 26
    "", // 27
    "Ожидание метки кольца. Если M2.11 != 0xF, то PC = 0x54", // 28
    "Установка метки сообщения M1.11 = 6, Подготовка перехода по клавише RVL = R1.10, PC = 0x58", // 29
    "", // 2A
    "", // 2B
    "", // 2C
    "", // 2D
    "", // 2E
    "", // 2F
    "", // 30
    "Ветвление на текущую операцию (RVL = curOp)", // 31
    "", // 32
    "Копирование Xh (R0.1..R0.10 <- M0.1..M0.10) and Xdp (R0.10)", // 33
    "Waiting M ring mark (M2.11 == 0xF)", // 34
    "Установка метки синхронизации (M1.11 = 0xF), переход на выполнение текущей операции", // 35
    "", // 36
    "Сдвиг M0.8-M0.1 <- S, S = R1.10. PC = 0x6E, RV = 0x6E", // 37
    "", // 38
    "", // 39
    "If R0.9 < R0.10 then goto 0x1D else goto 0x69", // 3A
    "", // 3B
    "", // 3C
    "Checking decimal point entry (R2.10 = 0xF)", // 3D
    "", // 3E
    "", // 3F
    "", // 40
    "", // 41
    "", // 42
    "", // 43
    "Нажата клавиша ряда 2. Сохранение столбца клавиши R0.9 = R0.10 = R1.10 = S. PC = ??", // 44
    "Инициализация регистра дисплея (R0.0-R0.7 = M1.0-M1.7 = 0xF). PC = 0x4E, RV = 0x4E", // 45
    "Увеличение счётчика цифр R2.9 += 1. Если R2.11 > 9, то PC = 0x23, иначе PC = 0x4E", // 46
    "", // 47
    "Установка текущего символа (пустой): S = R2.8. PC = 0x0E", // 48
    "", // 49
    "Ожидание метки кольца. Если M2.11 != 0xF, то PC = 0x25", // 4A
    "Инициализация регистра X (R0.0-R0.8 = M0.1-M0.7 = 0). PC = 0x45", // 4B
    "Установка текущего символа (точка) S = (R0.10==0?0x1:0xB) R2.8 = 0. ", // 4C
    "Установка режима с естественной запятой R0.11 = 0xE. PC = 0x6B", // 4D
    "Установка в S символа для вывода на дисплей S = R0.10. PC = 0x21", // 4E
    "", // 4F
    "", // 50
    "Сдвиг влево R2.7 <- R0.7..R0.0 <- S, R0.9 += 1, S = R0.9, если R0.9 == 0, то PC = 0x68, иначе PC = 0x10", // 51
    "Установка метки синхронизации (M1.11 = 0xF), Если нажата цифровая клавиша (R0.10 < 0xA), то PC = 0x61, иначе PC = 0x29", // 52
    "", // 53
    "Проверка столбца клавиши. Если R0.10 > 9, то PC = 0x6F, иначе PC = 0x6A", // 54
    "", // 55
    "", // 56
    "", // 57
    "Переход по столбцу нажатой клавиши PC = 0x78 | RV", // 58
    "", // 59
    "If key code (R0.10) > 9 then jump to 0x2D else jump to 0x41", // 5A
    "", // 5B
    "", // 5C
    "", // 5D
    "Getting decimal point char (S = R1.10)", // 5E
    "", // 5F
    "", // 60
    "Установка метки сообщения (M1.11 = 6). Проверка регистра РФЕ. Если R0.11 != 0xF, то PC = 0x1A, иначе PC = 0x70", // 61
    "Установка метки синхронизации (M1.11 = 0xF). PC = 0x6F", // 62
    "Вычислить символ знака (M1.8 <- sign S). PC = 0x62", // 63
    "Нажата клавиша ряда 3. Сохранение столбца клавиши R0.9 = R0.10 = R1.10 = S. PC = 0x28", // 64
    "", // 65
    "Shifting left S<-R1.7..R1.0<-S;", // 66
    "Проверка метки сообщения. Если M1.11 > 8, то PC = 0x33", // 67
    "", // 68
    "Copying XH (M0.0..M0.8 <- R0.0..R0.8);", // 69
    "Проверка занятости кольца. Если M0.9 == 0xF, то PC = 0x6F, иначе PC = 0x35", // 6A
    "Установка метки синхронизации (M1.11 = 0xF). PC = 0x4B", // 6B
    "", // 6C
    "Установка режима РЕЖ. S: 0, R0.9 = S-1, R0.11 = S-2, PC = 0x67", // 6D
    "Сдвиг R0.7-R0.0 <- S. PC = 0x21", // 6E
    "Ожидание нажатия клавиши (если Т, то PC = 0x04 и RV = 04 | (K1 ? 0x20 : 0) | (K2 ? 0x40 : 0))", // 6F
    "Установка регистра РФЕ. R0.11 = R0.10. PC = 0x33", // 70
    "", // 71
    "", // 72
    "", // 73
    "Переход PC = 0x4C, RV = 0x4C", // 74
    "Подготовка перехода по клавише RVL = R1.10 PC = 0x1C", // 75
    "", // 76
    "Сравнение положения десятичной точки с регистром РФЕ. Если R0.10 > 1 + R0.11, то PC = 0x3B, иначе PC = 0x10", // 77
    "", // 78
    "Сдвиг вправо R0.0..R0.10, R0.9: R0.10: позиция десятичной точки регистра X. PC = 0x77", // 79
    "Изменение знака числа M0.9 = R0.8 = 9 - R0.8. PC = 0x7E", // 7A
    "", // 7B
    "", // 7C
    "Digit buffer is full. Jump to 0x7E", // 7D
    "Считать знак числа (S <- R0.8). PC = 0x63", // 7E
    "", // 7F
]
