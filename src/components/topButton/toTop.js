// import React, { PureComponent } from "react";
// import { Button } from "@material-ui/core";

// class Dashboard extends PureComponent {
//   componentDidMount() {
//     window.addEventListener("scroll", this.handeleScroll);
//   }

//   handeleScroll() {
//     if (
//       document.body.scrollTop > 10 ||
//       document.documentElement.scrollTop > 10
//     ) {
//       document.getElementById("myBtn").style.display = "block";
//     } else {
//       document.getElementById("myBtn").style.display = "none";
//     }
//   }

//   topFunction(){
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
//   }

//   render() {
//     return (
//       <div className="wrapper">
//         <Button onClick={this.topFunction} id="myBtn" style={{
//             position: 'fixed',
//             bottom: '10px',
//             float: 'right',
//             right: '18.5%',
//             left: '77.25%' ,
//             maxWidth: '30px',
//             width: '100%',
//             fontSize: '12px',
//             borderColor: 'rgba(85, 85, 85, 0.2)',
//             backgroundColor: 'rgb(100,100,100)',
//             padding: '.5px',
//             borderRadius: '4px',
//             }} title="Go to top">
//           Top
//         </Button>
//       </div>
//     );
//   }
// }

// export default Dashboard;



import React from "react";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button"; //Add this line Here

export default class Index1 extends React.Component {
  render() {
    return (
      <div>
        <ScrollToTop />
            
      </div>
    );
  }
}