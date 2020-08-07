function[elo] = winelo(elo1,elo2)
k = 64;
P1 = 1.0/(1.0+10^((elo2-elo1)/400));
elo = elo1+k*(1-P1);