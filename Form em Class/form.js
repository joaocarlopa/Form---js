
const form = document.querySelector('.container');

function all_valor() {
    return {
        nome_user: document.querySelector('.nome'),
        sobre: document.querySelector('.sobre'),
        cpf_user: document.querySelector('.cpf'),
        user: document.querySelector('.user'),
        senha_user: document.querySelector('.Senha'),
        senha_userR: document.querySelector('.SenhaR'),
        btn: document.querySelector('.btn'),

    }
}

class validaCpf {
    constructor(cpf) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpf.replace(/\D+/g, '')
        });
    }

    novoCpf() {
        const cpfPuro = this.cpfLimpo.slice(0, -2);
        const digito1 = this.geraDigito(cpfPuro);
        const digito2 = this.geraDigito(cpfPuro + digito1);
    }

    geraDigito(cpfPuro) {
        let total = 0;
        let reverso = cpfPuro.length + 1;

        for (let i of cpfPuro) {
            total += reverso * Number(i);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';

    }


    isSeque() {
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.isSeque()) return false;
        this.novoCpf();

        return true;
    }


}

class valida_user {
    constructor(valor) {
        Object.defineProperty(this, 'user', {
            enumerable: false,
            value: valor,
            configurable: false,

        });
    }
    nome() {
        
        
        if (this.user.length < 6 || this.user.length > 12) return false;
        return true;
    }



}
class valida_senha {
    constructor(valor) {
        Object.defineProperty(this, 'senha', {
            enumerable: false,
            configurable: false,
            value: valor,
        });
    };

    senha_pronta() {
        if (this.senha.length < 6 || this.senha.length > 12) return false;
        return true;
    }
}
function iniciaSite() {
    return {
        valida: true,

        iniciaClick() {
            this.clickBtn();

        },
        clickBtn() {
            document.addEventListener('click', x => {
                const xr = x.target;

                if (xr.classList.contains('btn')) {
                    this.iniciaTudo();
                }
            });
        },
        iniciaTudo() {
            this.valida_cpf();
            this.valida_user();
            this.valida_senha();
            this.confere_item();
            if (this.valida_cpf() && this.valida_user() && this.valida_senha() && this.repete_senha() && all_valor().user.value.match(/^[a-zA-Z0-9]+$/g)) {
                alert('Campos preenchidos corretamente !');
            };

        },

        valida: true,
        confere_item() {
           
            


            

            for (let error of form.querySelectorAll('.red')) {
                error.remove();
            }

            for (let campo of form.querySelectorAll('.chama')) {
                const userC = campo.value;

                const achaText = campo.previousElementSibling.innerText;
                if (!userC) {
                    this.criaErro(campo, `Campo '${achaText}' não pode estar em branco`);
                    this.valida = false;
                }

                if (!this.valida_cpf()) {
                    if (campo.classList.contains('cpf')) {
                        this.criaErro(campo, 'Cpf inválido.');
                        this.valida = false;
                    }
                    
                }

                if (!this.valida_user()) {
                    if (campo.classList.contains('user')) {
                        this.criaErro(campo, 'O usuário deve conter entre 6 a 12 caracteres.');
                        this.valida = false;
                    }
                   

                }

                if (!userC.match(/^[a-zA-Z0-9]+$/g)) {

                    if (campo.classList.contains('user')) {
                        this.criaErro(campo, 'O usuário deve conter apenas letras e números.');
                        this.valida = false;
                        

                    }
                    
                    
                    
                }

                if (!this.valida_senha()) {
                    if (campo.classList.contains('Senha')) {
                        this.criaErro(campo, 'A senha deve conter entre 6 a 12 caracteres.')
                        this.valida = false;
                    }
                    
                }
                if (all_valor().senha_user.value !== all_valor().senha_userR.value) {
                    if (campo.classList.contains('senhas')) {
                        this.criaErro(campo, `Campos 'Senha' e 'Repetir senha' precisam ser iguais.`)
                        this.valida = false;
                    }
                    
                }
                this.valida = true;
                
            }
            return this.valida;
            
        },



        criaErro(campo, info) {
            const div = document.createElement('div');
            div.innerHTML = info;
            div.classList.add('red');
            campo.insertAdjacentElement('afterend', div);
        },
        valida_cpf() {
            let cpf = new validaCpf(all_valor().cpf_user.value);
            if (!cpf.valida()) return false;
            return true;
        },
        valida_user() {

            let nome_user = new valida_user(all_valor().user.value);
            if (!nome_user.nome()) return false;
            return true;
        },
        valida_senha() {
            let senha = new valida_senha(all_valor().senha_user.value);
            if (!senha.senha_pronta()) return false;

            return true;
        },

        repete_senha() {
            if (all_valor().senha_user.value !== all_valor().senha_userR.value) return false;
            return true;
        }


    }
}
const x = iniciaSite();
x.iniciaClick();

