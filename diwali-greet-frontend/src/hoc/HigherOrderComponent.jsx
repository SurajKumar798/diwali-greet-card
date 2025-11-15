
function HOC(WrapperComponent){
    return function InnerComponent(){
        return(
            <>
             <header></header>
              {<WrapperComponent />}
             <footer></footer>
            </>
        );
    };
}

export default HOC;