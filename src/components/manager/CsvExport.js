import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Button } from 'react-native-elements';
import firebase from "./../../../components/Firebase";

export default class CsvExport extends Component {

    constructor(){
        super();
        this.state = {
            fileName: "",
            stgRef: "",
            link: ""
        };
    }

    // headers = ["head1", "head2", "head3"]
    // body = [ [1,2,3],[1,2,3],[1,2,3] ]

 createCsv(headers, body) {
    let csvValue = headers.join(",");
    csvValue += "\n";
    body.forEach(item => {
      csvValue += item.join(",") + "\n";
    });
    return csvValue;
  }
  
   createBlob(data) {
    return new Blob([data], { type: "text/csv" });
  }


  uploadFile() {
    alert(this.createCsv(["head1", "head2", "head3"], [ [1,2,3],[1,2,3],[1,2,3] ]))

    const fileBlob = this.createBlob(this.createCsv(["head1", "head2", "head3"], [ [1,2,3],[1,2,3],[1,2,3] ]))
    const fileName = 'roi'
    // Create a root reference
    var storageRef = firebase.storage().ref('/csv/' + fileName + '.csv');
    var uploadTask = storageRef.put(fileBlob);
    // this.setState({
    //     fileName: fileName,
    //     stgRef: storageRef
    // })

  }

//   sendMailURL() {
//     return 7;
//   }

  getURL() {
    var storage = firebase.storage();
    var pathReference = storage.ref('/csv/roi.csv');
    var downloadTask = pathReference.getDownloadURL().then(this.setState({ link: downloadTask }));
  }

  render() {




      return(
          <View>

            <View style={{justifyContent: 'center', alignItems:'center', paddingTop:300}}>
                <Button color='#000' title='העלאת קובץ' onPress={() => this.uploadFile()}></Button>
            </View>

            {/* <View>
                <Button color='#000' title='שלח קישור הורדה למייל' onPress={this.sendMailURL()}></Button>
            </View> */}

            <View>
                <Button color='#000' title='קבל קישור הורדה לנייד' onPress={() => this.getURL()}></Button>
            </View>

            <View>
                <Button color='#000' title='הצג קישוxר' onPress={() => alert(JSON.stringify(this.state.link))}></Button>
            </View>

          </View>

      );
  }
}
  



