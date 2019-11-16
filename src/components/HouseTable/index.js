import React from 'react';
import MaterialTable from 'material-table';
import {inject, observer} from 'mobx-react';

@inject('rootStore')
@observer
export default class MaterialTableDemo  extends React.Component {
  constructor(props) {
    super(props );
    this.state = {
      columns: [
        {
          title: '项目',
          field: 'project',
        },
        {
          title: '地铁线',
          field: 'subway',
        },
        {
          title: '租房地址',
          field: 'address',
        },
        {
          title: '合同起始日',
          field: 'startDate',
        },
        {
          title: '合同结束日',
          field: 'endDate',
        },
        {
          title: '合同签订人',
          field: 'signer',
        },
        {
          title: '入住人员',
          field: 'user',
        },
        {
          title: '所属人员',
          field: 'userProject',
        },
      ],
    }
  }

  render() {
    return (
      <MaterialTable
        title="华北租房资源"
        columns={this.state.columns}
        data={this.props.rootStore.HouseStore.houses}
        editable={{
          // onRowAdd: (newData) => new Promise((resolve) => {
          //   setTimeout(() => {
          //     resolve();
          //     const data = [...state.data];
          //     data.push(newData);
          //     setState({...this.state, data});
          //   }, 600);
          // }),
          // onRowUpdate: (newData, oldData) => new Promise((resolve) => {
          //   setTimeout(() => {
          //     resolve();
          //     const data = [...state.data];
          //     data[data.indexOf(oldData)] = newData;
          //     setState({...state, data});
          //   }, 600);
          // }),
          // onRowDelete: (oldData) => new Promise((resolve) => {
          //   setTimeout(() => {
          //     resolve();
          //     const data = [...state.data];
          //     data.splice(data.indexOf(oldData), 1);
          //     setState({...state, data});
          //   }, 600);
          // }),
        }}
      />
    );
  }



}
