import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import Picker from './src/Components/Picker';
import api from './src/services/api';

export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(()=>{
    async function loadMoedas(){
      const response = await api.get('all');
      
      let arrayMoedas = []
      Object.keys(response.data).map((key)=>{
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })
      
      setMoedas(arrayMoedas);
      setLoading(false);


    }

    loadMoedas();
  }, []);


  async function converter(){
    if(moedaSelecionada === null || moedaBValor === 0){
      alert('Por favor selecione uma moeda.');
      return;
    }
    
    //USD-BRL ele devolve quanto é 1 dolar convertido pra reais
    const response = await api.get(`all/${moedaSelecionada}-BRL`);
    //console.log(response.data[moedaSelecionada].ask);

    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor) );
    setValorConvertido(`R$ ${resultado.toFixed(2)}`);
    setValorMoeda(moedaBValor)

    //Aqui ele fecha o teclado
    Keyboard.dismiss();


  }
 
  if(loading){
   return(
   <View style={{ justifyContent: 'center', alignItems: 'center', flex:1 }}>
    <ActivityIndicator color="#FFF" size={45} />
   </View>
   )
 }else{
  return (
    <View style={styles.container}>
 
      <View style={styles.areaMoeda}>
       <Text style={styles.titulo}>Selecione sua moeda</Text>
       <Picker moedas={moedas} onChange={ (moeda) => setMoedaSelecionada(moeda) } />
      </View>
 
      <View style={styles.areaValor}>
       <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
       <TextInput
       placeholder="EX: 150"
       style={styles.input}
       keyboardType="numeric"
       onChangeText={ (valor) => setMoedaBValor(valor) }
       />
      </View>
 
     <TouchableOpacity style={styles.botaoArea} onPress={converter}>
       <Text style={styles.botaoTexto}>Converter</Text>
     </TouchableOpacity>
 
      {valorConvertido !== 0 && (
      <View style={styles.areaResultado}>
        <Text style={styles.valorConvertido}>
            {valorMoeda} {moedaSelecionada}
        </Text>
        <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 } ]}>
          Corresponde a
        </Text>
        <Text style={styles.valorConvertido}>
          {valorConvertido}
        </Text>
      </View>
      )}
 
    </View>
   );
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#090a0b',
    paddingTop: 40,
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#fff',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1,
  },
  titulo: {
    fontSize: 18,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  tituloMoeda: {
    fontSize: 18,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5,
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#fff',
    paddingBottom: 9,
    paddingTop: 9,
    paddingLeft: 5,
    paddingRight: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 19,
    marginTop: 8,
    color: '#000',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  botaoArea: {
    width: '90%',
    backgroundColor: '#06f',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  areaResultado: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  valorConvertido: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
});
