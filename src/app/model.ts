export class Joueur {
    public nom?: string;
    public role?: Role;
    public linkedTo?: Joueur;
    public killed?: boolean;
    public out?: boolean;
    public voyant?: Joueur[];
    public nb?: number;
}

export class Role {
    public nom?: string;
    public image!: string;
    public description!: string;
    public nb!: number;
    public order!: number;
    public role?: string;
    public heal?: boolean;
    public kill?: boolean;
    public showPlayers?: boolean;
    public end?: number;
}