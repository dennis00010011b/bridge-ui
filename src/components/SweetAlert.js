import React from 'react';
import swal from 'sweetalert';
import { inject, observer } from "mobx-react";

@inject("RootStore")
@observer
export class SweetAlert extends React.Component {
  constructor(props){
    super(props)
    this.alertStore = props.RootStore.alertStore;
  }
  componentWillReact(){
    if(this.alertStore.alerts.length > 0){
      const alert = this.alertStore.alerts.slice()[0]
      swal(alert.label, alert.message, alert.type).then(() => {
        this.alertStore.remove(alert)
      })
    }
  }
  logErrors() {
    const errors = this.alertStore.alerts.filter(alert => alert.type === 'error')
    if (errors.length) {
      console.log('Found errors:', errors.length)
    }
  }

  render(){
    this.logErrors()
    return (
      <div style={{display: 'none'}}></div>
    )
  }
}
