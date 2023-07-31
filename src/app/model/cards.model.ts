export interface Card{
    rank: Rank;
    suit: Suit;
}

export enum Rank{
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    JACK = 11,
    QUEEN = 12,
    KING = 13,
    ACE = 14
}

export enum Suit{
    HEART = 0,
    SPADE = 1,
    CLUB = 2,
    DIAMOND = 3
}