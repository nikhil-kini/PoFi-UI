import { PlayerPosition } from "../../model/player.model";

export abstract class Constants{
    static readonly MOBILE_TRANSITION = '(max-width: 600px)';
}

export abstract class Position{
    static readonly PLAYER_POSITION : {[index: number]: PlayerPosition[]} = {
        2: [PlayerPosition.SMALL_BLIND, PlayerPosition.BIG_BLIND],
        3: [PlayerPosition.SMALL_BLIND, PlayerPosition.BIG_BLIND,
            PlayerPosition.EARLY],
        4: [PlayerPosition.SMALL_BLIND, PlayerPosition.BIG_BLIND,
            PlayerPosition.EARLY, PlayerPosition.LATE],
        5: [PlayerPosition.SMALL_BLIND, PlayerPosition.BIG_BLIND,
            PlayerPosition.EARLY, PlayerPosition.MIDDLE,
            PlayerPosition.LATE],
        6: [PlayerPosition.SMALL_BLIND, PlayerPosition.BIG_BLIND,
            PlayerPosition.EARLY, PlayerPosition.MIDDLE,
            PlayerPosition.MIDDLE, PlayerPosition.LATE],
        7: [PlayerPosition.SMALL_BLIND, PlayerPosition.BIG_BLIND,
            PlayerPosition.EARLY, PlayerPosition.EARLY,
            PlayerPosition.MIDDLE, PlayerPosition.MIDDLE,
            PlayerPosition.LATE],
        8: [PlayerPosition.SMALL_BLIND, PlayerPosition.BIG_BLIND,
            PlayerPosition.EARLY, PlayerPosition.EARLY,
            PlayerPosition.MIDDLE, PlayerPosition.MIDDLE,
            PlayerPosition.LATE, PlayerPosition.LATE],
        9: [PlayerPosition.SMALL_BLIND, PlayerPosition.BIG_BLIND,
            PlayerPosition.EARLY, PlayerPosition.EARLY, PlayerPosition.EARLY,
            PlayerPosition.MIDDLE, PlayerPosition.MIDDLE,
            PlayerPosition.LATE, PlayerPosition.LATE],
    }
}