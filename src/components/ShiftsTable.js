import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Container } from 'native-base';
import CustomHeader from './manager/CustomHeader';
 
export default class ShiftsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6'],
      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
    }
  }
 
  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 7; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
 
    return (
      <Container>
        <CustomHeader title="לוח משמרות" drawerOpen={() => this.props.navigation.openDrawer()}>
        </CustomHeader> 

      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            
            <ScrollView style={styles.dataWrapper}>
              
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      </Container>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});