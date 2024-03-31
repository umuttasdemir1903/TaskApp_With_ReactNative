//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button, Radio, RadioGroup} from '@ui-kitten/components';
import {Formik} from 'formik';
import CustomDatePicker from '../../components/uı/customDatePicker';
import {taskSchema} from '../../utils/validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddTask = () => {
  const saveTask = async values => {
    try {
      await AsyncStorage.setItem('task', JSON.stringify(values));
      console.log('balarılı');
    } catch (e) {
      //save error
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          title: '',
          description: '',
          startDate: null,
          endDate: null,
          category: null,
        }}
        validationSchema={taskSchema}
        onSubmit={values => saveTask(values)}>
        {({handleChange, handleSubmit, values, setFieldValue, errors}) => (
          <View>
            <Input
              size="large"
              style={{marginVertical: 10}}
              date={values.title}
              label={'Title'}
              placeholder=""
              onChangeText={handleChange('title')}
              status={errors.title ? 'danger' : 'basic'}
              caption={errors.title}
            />
            <Input
              multiline
              size="large"
              style={{marginVertical: 10}}
              value={values.description}
              label={'Description'}
              placeholder=""
              onChangeText={handleChange('description')}
              status={errors.description ? 'danger' : 'basic'}
              caption={errors.description}
            />
            <CustomDatePicker
              size="large"
              style={{marginVertical: 10}}
              date={values.startDate}
              label={'Start Date'}
              onSelectDate={date => setFieldValue('startDate', date)}
              status={errors.startDate ? 'danger' : 'basic'}
              caption={errors.startDate}
            />
            <CustomDatePicker
              size="large"
              style={{marginVertical: 10}}
              date={values.endDate}
              label={'End Date'}
              onSelectDate={date => setFieldValue('endDate', date)}
              status={errors.endDate ? 'danger' : 'basic'}
              caption={errors.endDate}
            />
            <RadioGroup
              selectedIndex={values.category}
              onChange={index => setFieldValue('category', index)}>
              <Radio status="success">Software</Radio>
              <Radio status="success">Design</Radio>
              <Radio status="success">Operation</Radio>
            </RadioGroup>
            <Button
              status="success"
              style={{marginTop: 30}}
              onPress={handleSubmit}>
              CREATE
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

//make this component available to the app
export default AddTask;
