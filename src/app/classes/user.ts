import { Film } from '../classes/film';

export class User {
    public id: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public code: string;
    public points: number;
    public filmFlg: boolean;
    public crewFlg: boolean;
    public actorFlg: boolean;
    public criticFlg: boolean;
    public staffFlg: boolean;
    public adminLevel: number;
    public created: string;
    public icon: string;
    public userTitle: string;
    public avatar: number;
    public avatarFlg: boolean;
    public filmCount: number;
    public films: any;

    public ownerFlg: boolean;
    public boardFlg: boolean;
    public adminFlg: boolean;
    public superAdminFlg: boolean;
    public veteranFlg: boolean;
    public guildMemberFlg: boolean;
    public badges: any;
    public emailCount: number;
    public badgeCount: number;
    public reviewCount: number;
    public imdb: string;
    public bio: string;
    public facebook: string;
    public twitter: string;
    public instagram: string;
    public lastUpd: string;
    public bioLines = [];

    constructor(line: string, code: string = '') {
        var components = line.split("|");
        if (components.length > 12) {
            var x = 0;
            this.firstName = components[x++];
            this.lastName = components[x++];
            this.id = Number(components[x++]);
            this.points = Number(components[x++]);
            this.avatar = Number(components[x++]) || 0;
            this.adminLevel = Number(components[x++]);
            this.filmFlg = (components[x++] == 'Y');
            this.crewFlg = (components[x++] == 'Y');
            this.actorFlg = (components[x++] == 'Y');
            this.criticFlg = (components[x++] == 'Y');
            this.staffFlg = (components[x++] == 'Y');
            this.avatarFlg = (components[x++] == 'Y');
            this.ownerFlg = (components[x++] == 'Y');
            this.boardFlg = (components[x++] == 'Y');
            this.adminFlg = (components[x++] == 'Y');
            this.superAdminFlg = (components[x++] == 'Y');
            this.veteranFlg = (components[x++] == 'Y');
            this.guildMemberFlg = (components[x++] == 'Y');

            this.filmCount = Number(components[x++]);
            this.badgeCount = Number(components[x++]);
            this.reviewCount = Number(components[x++]);
            this.username = components[x++];
            this.lastUpd = components[x++];

            // full film
            var filmLine = components[x++] || '';
            this.email = components[x++];
            var badges = components[x++];
            this.badges = [];
            if (badges)
                this.badges = badges.split(':');
            this.imdb = components[x++];
            this.bio = components[x++];
            this.facebook = components[x++];
            this.twitter = components[x++];
            this.instagram = components[x++];

            var films = [];
            if (filmLine) {
                var filmlines = filmLine.split('<f>');
                filmlines.forEach(line => {
                    line = line.replace(/\+/g, '|');
                    var film = new Film(line);
                    console.log(line, film);
                    films.push(film);
                });
            }

            this.films = films;
            this.code = code;
            var iconObj = getIconOfUser(this);
            this.icon = iconObj.icon;
            this.userTitle = iconObj.name;
            if (this.bio) {
                this.bio = this.bio.replace(/\[nl\]/g, '\n');
                this.bioLines = this.bio.split('\n\n');
            }
        }
    }

}

function getIconOfUser(user: User) {
    if (user.criticFlg)
        return { icon: 'comments', name: 'Official Film Critic' };

    if (user.staffFlg)
        return { icon: 'briefcase', name: 'Staff Member' };

    if (user.filmFlg)
        return { icon: 'film', name: 'Film Maker' };

    if (user.actorFlg)
        return { icon: 'star-o', name: 'Actor' };

    if (user.crewFlg)
        return { icon: 'truck', name: 'Film Crew Member' };

    return { icon: 'user', name: 'Standard User' };
}