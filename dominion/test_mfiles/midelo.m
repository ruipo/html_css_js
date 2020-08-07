function[elo] = midelo(elo1,elo2,elo3)
k = 64;

P1 = 1.0/(1.0+10^((elo3-elo1)/400));
elo1 = elo1+k*(0-P1);

P1 = 1.0/(1.0+10^((elo2-elo1)/400));
elo = elo1+k*(1-P1);