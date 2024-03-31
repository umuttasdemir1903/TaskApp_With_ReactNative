//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {Input, Button, Toggle} from '@ui-kitten/components';
import * as Yup from 'yup';
// create a component
const FormExample = () => {
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Zorunlu Alan'),
    surname: Yup.string().required('Zorunlu Alan'),
    email: Yup.string()
      .required('Zorunlu Alan')
      .email('Lütfen geçerli bir email adresi giriniz'),
    phone: Yup.string()
      .required('Zorunlu Alan')
      .min(11, 'Lütfen minimum 11 hane olarak giriniz.')
      .max(13, 'Lütfen maximum 13 hane olarak giriniz.'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .matches(
        /^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9ğüşıöçĞÜŞİÖÇ!^+%/()=?_*{[}.:,;/#£$-\]]{8,50})$/,
        'Şartlar sağlanmıyor',
      ),
    agreementConfirm: Yup.bool()
      .required('Zorunlu')
      .oneOf([true], 'Sözleşmeyi onaylamanız gerekiyor'),
    passwordConfirm: Yup.string()
      .required('Zorunlu Alan')
      .oneOf([Yup.ref('password')], 'Şifreler uyuşmuyor'),
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
          backgroundColor: '#06e096',
          minHeight: 125,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          KAYIT OLUŞTUR
        </Text>
      </View>
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <Formik
            initialValues={{
              name: '',
              surname: '',
              email: '',
              phone: '',
              password: '',
              passwordConfirm: '',
              agreementConfirm: false,
            }}
            validationSchema={registerSchema}
            onSubmit={values => alert(JSON.stringify(values, 0, 2))}>
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
              errors,
            }) => (
              <View>
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.name}
                  label={'İsim'}
                  placeholder="İsim bilgisi girin"
                  onChangeText={handleChange('name')}
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.name}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.surname}
                  label={'Soyisim'}
                  placeholder="Soyisim bilgisi girin"
                  onChangeText={handleChange('surname')}
                  status={errors.surname ? 'danger' : 'basic'}
                  caption={errors.surname}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.email}
                  label={'E-mail'}
                  placeholder="E-mail bilgisi girin"
                  onChangeText={handleChange('email')}
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.phone}
                  label={'Telefon'}
                  placeholder="Telefon bilgisi girin"
                  onChangeText={handleChange('phone')}
                  status={errors.phone ? 'danger' : 'basic'}
                  caption={errors.phone}
                />
                <Input
                  secureTextEntry={false}
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.password}
                  label={'Şifre'}
                  placeholder="Şifre bilgisi girin"
                  status={errors.password ? 'danger' : 'basic'}
                  onChangeText={handleChange('password')}
                  caption={errors.password}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwordConfirm}
                  label={'Şifre Tekrar'}
                  placeholder="Şifre Tekrarl bilgisi girin"
                  onChangeText={handleChange('passwordConfirm')}
                  caption={errors.passwordConfirm}
                  status={errors.passwordConfirm ? 'danger' : 'basic'}
                />
                <View>
                  <Toggle
                    checked={values.agreementConfirm}
                    onChange={value =>
                      setFieldValue('agreementConfirm', value)
                    }>
                    Kullanıcı Sözleşmesini ve Gizlilik Sözleşmesini kabul
                    ediyorum.
                  </Toggle>
                  {errors.agreementConfirm && (
                    <Text style={{color: 'red'}}>
                      {errors.agreementConfirm}
                    </Text>
                  )}
                </View>
                <Button
                  status="success"
                  style={{marginTop: 30}}
                  onPress={handleSubmit}>
                  KAYDET
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default FormExample;
