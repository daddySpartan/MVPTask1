import React from 'react';
import { Pagination } from 'semantic-ui-react';
import '../NavMenu.css';

function PageChange (props) {
  const {data,changePage,changeRows,activePage} = props;
    
  const onChange = (e, pageInfo) => {
  	var setActivePage = pageInfo.activePage;
    var b = setActivePage * changeRows - changeRows;
    var e = setActivePage * changeRows;
    changePage(b,e,setActivePage)
  };  

  return (
    <Pagination floated="right"
    totalPages={Math.ceil(data.length / changeRows)}
    activePage={activePage}
    onPageChange={onChange}
    ellipsisItem={null}  
    firstItem={null}
    lastItem={null}
    />  
  )

};

export default PageChange;