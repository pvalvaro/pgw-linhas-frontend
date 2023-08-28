import { Voo } from "./voo.model";
export class Passagem{
    passagemId?: number;
    localizador?: String;
    passageiroNome?: String;
    cpfPassageiro?: String;
    dataNascimentoPassageiro?: Date;
    totalViagem?: number;
    classeEscolhida?: String;
    nomeComprador?: String;
    emailComprador?: String;
    cpfComprador?: String;
    dataCompra?: Date;
    qtdBagagemExtra?: number;
    statusPassagem?: String;
    qtdPassagens?: number;
    origem?: String;
    destino?: String;
    dataPartida?: Date;
    dataChegada?: Date;
    codigoVoo?:String;
    idVoo?: number;
    valorAssento?:number;
    valorBagagemExtra?:number;
    identificBagagem?:string;
}