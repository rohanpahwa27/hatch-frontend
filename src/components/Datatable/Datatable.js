import React, { Component, forwardRef } from "react";
import "./Datatable.css";
import { Container, Row, Col } from "react-bootstrap";
import MaterialTable from "material-table";
// import api from "../../api/api";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default class Datatable extends Component {

  render() {
    return (
      <Container className="datatable-container">
        <Row>
          <Col
            sm={{ span: 12 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 12, offset: 0 }}
          >
            <div>
              <p className="welcome-text">Viewing applicants</p>
            </div>
            <div className="d-flex flex-column datatable-card p-3 p-lg-5">
              <div>
              <MaterialTable
                icons={tableIcons}
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Votes', field: 'votes', type: 'numeric' },
                    { title: 'Comments', field: 'comments', type: 'numeric' },
                  ]}
                  data={[
                      { name: 'Emily Readey', votes: '17', comments: 53 },
                      { name: 'Rohan Pahwa', votes: '21', comments: 51 },
                      { name: 'Yuki Peters', votes: '25', comments: 32 },
                      { name: 'Yashmeet Gambhir', votes: '12', comments: 31 },
                      { name: 'Leo Au-Yeung', votes: '14', comments: 29 },
                      { name: 'Eunia Lee', votes: '7', comments: 27 },
                    ]}
                  title="101 active applicants, 157 total"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
