export class Joueur {
    public nom?: string;
    public role?: Role;
    public linkedTo?: Joueur;
    public killed?: boolean;
    public out?: boolean;
    public voyant?: Joueur[];
    public nb?: string;
    public maire?: boolean;
    public protected?: boolean;
    public justProtected?: boolean;
    public alias?: Role;
    public vote?: number;
    public select?: string;
    public defkilled?: boolean;
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
    public use?: number;
    public used?: boolean;
    public life?: number;
    public reste?: Role[];
    public vote?: number;
    public guess?:string;
}