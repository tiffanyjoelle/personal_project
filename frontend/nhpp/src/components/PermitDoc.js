import React from 'react';

function PermitDoc(props) {
    
    function createMaterialList() {
      try {
        let letter = "A"
        let count = 0
        const materialList = props.permitInfo.material.map((item) => {
          count++;
          letter = String.fromCharCode('A'.charCodeAt(0) + count - 1);
          return (
            <tr>
              <td colSpan={2} style={{width: '2.4in', border: 'none', padding: '0in 5.4pt', height: '0.45in', verticalAlign: 'top'}}>
                <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.5in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>{letter}. &nbsp; {item.source}</span></p>
              </td>
              <td colSpan={2} style={{width: '2.4in', border: 'none', padding: '0in 5.4pt', height: '0.45in', verticalAlign: 'top'}}>
                <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.5in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>{letter}. &nbsp; {item.form}</span></p>
              </td>
              <td colSpan={2} style={{width: '2.4in', border: 'none', padding: '0in 5.4pt', height: '0.45in', verticalAlign: 'top'}}>
                <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.5in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>{letter}. &nbsp; {item.amount_of_source}</span></p>
              </td>
            </tr>
          );
        });
        return materialList;
      } catch (error) {
        console.error(error);
      }
    }

    function createAuthorizedUseList() {
      try {
        let letter = "A"
        let count = 0
        const useList = props.permitInfo.authorized_use.map((item) => {
          count++;
          letter = String.fromCharCode('A'.charCodeAt(0) + count - 1);
          return (
            <tr>
              <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.5in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>{letter}. &nbsp; {item.use}.</span></p>
            </tr>
          );
        });
        return useList;
      } catch (error) {
        console.error(error);
      }
    }

    function createAuthorizedUserList() {
      try {
        const userList = props.permitInfo.authorized_user.map((item) => {
          return (
            <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.5in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>{item.full_name}, {item.credentials} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>
          );
        });
        return userList;
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <div>
      {props &&
      <div>
        <div align="center" style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif'}}>
          <table style={{width: '5.2e+2pt', borderCollapse: 'collapse', border: 'none'}}>
            <tbody>
              <tr>
                <td style={{width: '1.6in', border: '1.5pt solid windowtext', padding: '0in 5.4pt', height: '0.5in', verticalAlign: 'bottom'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}></span><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;&nbsp;</span><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}></span><span style={{fontSize: '13px'}}>&nbsp;</span></p>
                </td>
                <td colSpan={4} style={{width: '4.0in', border: 'solid windowtext 1.5pt', borderLeft: 'none', padding: '0in 5.4pt 0in 5.4pt', height: '.5in'}}>
                  <h2 style={{margin: '0in', fontSize: '13px', fontFamily: '"Arial",sans-serif', textAlign: 'center'}}><span style={{fontSize: '21px'}}>MATERIALS PERMIT</span></h2>
                </td>
                <td style={{width: '1.6in', borderTop: '1.5pt solid windowtext', borderRight: '1.5pt solid windowtext', borderBottom: '1.5pt solid windowtext', borderImage: 'initial', borderLeft: 'none', padding: '0in 5.4pt', height: '0.5in', verticalAlign: 'bottom'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', textAlign: 'right'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}></span></p>
                </td>
              </tr>
              <tr>
                <td colSpan={6} style={{width: '7.2in', border: 'solid windowtext 1.5pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', height: '.5in'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', textAlign: 'justify'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>In accordance with U.S. Nuclear Regulatory Commission License No. 03-23853-01VA and VHA Directive 1105 and in reliance on statements made by the applicant, permission is hereby granted to receive, possess, transfer, and store radioactive materials listed below, and to use this material for the purpose and at the places listed below.</span></p>
                </td>
              </tr>
              <tr>
                <td colSpan={3} rowSpan={3} style={{width: '3.6in', borderRight: '1.5pt solid windowtext', borderBottom: '1.5pt solid windowtext', borderLeft: '1.5pt solid windowtext', borderImage: 'initial', borderTop: 'none', padding: '0in 5.4pt', height: '0.6in', verticalAlign: 'top'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', textAlign: 'center', lineHeight: '200%'}}><span style={{fontSize: '13px', lineHeight: '200%', fontFamily: '"Arial",sans-serif'}}>Permittee</span></p>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', lineHeight: '150%'}}><span style={{fontSize: '13px', lineHeight: '150%', fontFamily: '"Arial",sans-serif'}}>1. {props.facilityInfo && props.facilityInfo.attributes.name} </span></p>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', lineHeight: '150%'}}><span style={{fontSize: '13px', lineHeight: '150%', fontFamily: '"Arial",sans-serif'}}>2. {props.facilityInfo && props.facilityInfo.attributes.address.physical.address_1}</span></p>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', lineHeight: '150%'}}><span style={{fontSize: '13px', lineHeight: '150%', fontFamily: '"Arial",sans-serif'}}>{props.facilityInfo && props.facilityInfo.attributes.address.physical.city}, {props.facilityInfo && props.facilityInfo.attributes.address.physical.state} {props.facilityInfo && props.facilityInfo.attributes.address.physical.zip}</span></p>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', textIndent: '.25in', lineHeight: '150%'}}><span style={{fontSize: '13px', lineHeight: '150%', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
                </td>
                <td colSpan={3} style={{width: '3.6in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.5pt', borderRight: 'solid windowtext 1.5pt', padding: '0in 5.4pt 0in 5.4pt', height: '.6in'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>3. &nbsp; In accordance with your request, Permit No. {props.permitInfo.permit_num}<strong>&nbsp;</strong></span></p>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><strong><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp; &nbsp; &nbsp;&nbsp;</span></strong><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>is amended and renewed to read as follows.</span></p>
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{width: '3.6in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.5pt', borderRight: 'solid windowtext 1.5pt', padding: '0in 5.4pt 0in 5.4pt', height: '.3in'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>4. &nbsp; Expiration date: {props.permitInfo.exp_date}</span></p>
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{width: '3.6in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.5pt', borderRight: 'solid windowtext 1.5pt', padding: '0in 5.4pt 0in 5.4pt', height: '.3in'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>5. &nbsp; Docket or Reference No.: {props.permitInfo.docket_num}</span></p>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{width: '2.4in', border: 'none', padding: '0in 5.4pt', height: '31.9pt', verticalAlign: 'top'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>6. &nbsp; Byproduct, source, and/or special nuclear material</span></p>
                </td>
                <td colSpan={2} style={{width: '2.4in', border: 'none', padding: '0in 5.4pt', height: '31.9pt', verticalAlign: 'top'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>7. &nbsp; Chemical and/or physical form</span></p>
                </td>
                <td colSpan={2} style={{width: '2.4in', border: 'none', padding: '0in 5.4pt', height: '31.9pt', verticalAlign: 'top'}}>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
                  <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>8. &nbsp; Maximum amount permittee may possess at any one time under this permit</span></p>
                </td>
              </tr>
              {createMaterialList()}
              
            </tbody>
          </table>
        </div>
        <div align="center" style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif'}}>
          <table style={{width: '5.2e+2pt', borderCollapse: 'collapse', border: 'none'}}>
            <tbody>
              
              <tr>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '6.0pt', marginRight: '0in', marginBottom: '6.0pt', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif', color: 'white'}}>9.</span><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp; &nbsp;Authorized Use.</span></p>

        {createAuthorizedUseList()}

        <div style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', border: 'none', borderTop: 'solid windowtext 1.5pt', padding: '1.0pt 0in 0in 0in'}}>
          <h4 style={{margin: '0in', textAlign: 'center', fontSize: '16px', fontFamily: '"Arial",sans-serif', marginTop: '6.0pt', border: 'none', padding: '0in'}}>CONDITIONS</h4>
        </div>
        <p style={{margin: '0in', fontSize: '5px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '5px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginTop: '0in', marginRight: '-4.5pt', marginBottom: '.0001pt', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>10. &nbsp;Permitted material shall be used or stored only at the permittee’s facilities located at</span> <span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>{props.facilityInfo && props.facilityInfo.attributes.address.physical.address_1}, {props.facilityInfo && props.facilityInfo.attributes.address.physical.city}, {props.facilityInfo && props.facilityInfo.attributes.address.physical.state}.</span></p>
        <p style={{margin: '0in', fontSize: '10px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '10px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>11.&nbsp;</span><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>The Radiation Safety Officer for this permit is</span><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;{props.permitInfo.primary_rso.first_name} {props.permitInfo.primary_rso.last_name}, {props.permitInfo.primary_rso.credentials}. A written continuity plan for a qualified Radiation Safety Officer shall be kept current and be approved, annually, by the Radiation Safety Committee. If the Radiation Safety Officer permanently discontinues duties under this permit, the permittee shall immediately notify the National Health Physics Program. Permit activities must cease without a qualified Radiation Safety Officer who meets Nuclear Regulatory Commission requirements.</span></p>
        <p style={{margin: '0in', fontSize: '5px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '10px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>12. &nbsp;Permitted material shall only be used by, or under the supervision of:</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.5in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>A. &nbsp; Individuals permitted to work as authorized users in accordance with 10 CFR 35.13 and 10 CFR 35.14.</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        {props.permitInfo.authorized_user.length>0 && 
        <>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.5in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>B. &nbsp; The following individuals are authorized users for the material and medical uses:</span></p>
        <p style={{margin: '0in', fontSize: '5px', fontFamily: '"Times New Roman",serif', marginLeft: '.5in', textIndent: '-.25in'}}><span style={{fontSize: '5px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '2.75in', textIndent: '-2.25in', lineHeight: '150%'}}><u><span style={{fontSize: '13px', lineHeight: '150%', fontFamily: '"Arial",sans-serif'}}>Authorized User</span></u><span style={{fontSize: '13px', lineHeight: '150%', fontFamily: '"Arial",sans-serif'}}>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>

        {createAuthorizedUserList()}
      
        <p style={{margin: '0in', fontSize: '5px', fontFamily: '"Times New Roman",serif', marginLeft: '2.75in', textIndent: '-2.25in'}}><span style={{fontSize: '0px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.5in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>C. &nbsp; The following individuals are authorized users for nonmedical uses:</span></p>
        <p style={{margin: '0in', fontSize: '5px', fontFamily: '"Times New Roman",serif', marginLeft: '2.75in', textIndent: '-2.25in'}}><span style={{fontSize: '5px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textAlign: 'justify', textIndent: '.25in'}}><u><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>Authorized User&nbsp;</span></u><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>
    
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>Radiation Safety Officer &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '2.75in', textIndent: '-2.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        </>}
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>13. &nbsp;The permittee shall classify sealed sources, not in active use for their intended clinical or research purpose for a period of 24 months, as disused sources, and evaluate the disused sources for disposal as expeditiously as possible.&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '5px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginBottom: '6.0pt'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>14. &nbsp;The permittee shall provide oversight for security of radioactive materials by:</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', marginBottom: '6.0pt', textIndent: '.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>A. &nbsp;Use of two delay methods for sealed sources not in use.</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', textIndent: '.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>B. &nbsp;Focus to security commensurate with possible risks of radioactive materials unauthorized use. &nbsp; &nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '10px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '10px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '5px', fontFamily: '"Times New Roman",serif', marginLeft: '.25in', textIndent: '-.25in'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>15. &nbsp;Except as specifically provided otherwise in this permit, the permittee shall conduct its program in accordance with the statements, representations, and procedures contained in the documents, including any enclosures, listed below. This permit condition applies only to those statements, representations, and procedures required to be submitted in accordance with the regulations. Additionally, this permit condition does not limit the permittee’s ability to make changes to the radiation protection program as provided for in 10 CFR 35.26. The U.S. Nuclear Regulatory Commission’s regulations shall govern unless the statements, representations, and procedures in the permittee's application and correspondence impose on the permittee requirements that are more restrictive than or in addition to the regulations.</span></p>
        <p style={{margin: '0in', border: 'none', padding: '0in', fontSize: '15px', fontFamily: '"Arial",sans-serif'}}><span style={{fontSize: '13px'}}>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></p>
        
        <div style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif', border: 'none', borderTop: 'solid windowtext 1.5pt', padding: '1.0pt 0in 0in 0in'}}>
          <h5 style={{margin: '0in', textAlign: 'center', border: 'none', padding: '0in', fontSize: '16px', fontFamily: '"Arial",sans-serif'}}>FOR THE DEPARTMENT OF VETERANS AFFAIRS</h5>
        </div>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>&nbsp;</span></p>
        <p style={{margin: '0in', fontSize: '16px', fontFamily: '"Times New Roman",serif'}}><span style={{fontSize: '13px', fontFamily: '"Arial",sans-serif'}}>Date _________________________________  &nbsp; &nbsp; &nbsp; &nbsp; By_________________________________________</span></p>
        <p style={{margin: '0in', border: 'none', padding: '0in', fontSize: '15px', fontFamily: '"Arial",sans-serif', marginLeft: '243.0pt'}}><span style={{fontSize: '13px'}}>Executive Director</span></p>
        <p style={{margin: '0in', border: 'none', padding: '0in', fontSize: '15px', fontFamily: '"Arial",sans-serif', marginLeft: '243.0pt'}}><span style={{fontSize: '13px'}}>VHA National Health Physics Program</span></p>
        </tr>
        </tbody>
        </table>
        </div>
      </div>
}
</div>
    );
  }

export default PermitDoc