export interface Stat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export function transformStats(statArray: Stat[]): Stats {
  const stats: Partial<Stats> = {};
  statArray.forEach((item) => {
    switch (item.stat.name) {
      case "hp":
        stats.hp = item.base_stat;
        break;
      case "attack":
        stats.attack = item.base_stat;
        break;
      case "defense":
        stats.defense = item.base_stat;
        break;
      case "special-attack":
        stats.specialAttack = item.base_stat;
        break;
      case "special-defense":
        stats.specialDefense = item.base_stat;
        break;
      case "speed":
        stats.speed = item.base_stat;
        break;
    }
  });
  return stats as Stats;
}
