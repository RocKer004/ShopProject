import React from 'react';

function Recipedisplay({name,image, healthLabels,source,dietLabels,calories}) {
  return (
    <div className="recipeDisplay">
    
      <div className="recipeDisplay-header">
      <img src={image} alt={image}/>
      </div>
      <div className="recipeDisplay-body">
        <div className="recipe-info">

        <div className="recipe-name">{name} </div>  
  
        <div className="Healthlabels recipe-additional-info">
  Healthlabels:{healthLabels.map((healthlabel)=>{
   return(
    " "+healthlabel+","
   );
 })}</div>
 <div className="source recipe-additional-info">
  Source:{" "+source}
 </div>
 <div className ="dietLabels recipe-additional-info">
   Diet labels: {" "+dietLabels}
 </div>
 <div className ="calories recipe-additional-info">
   Calories: {" "+parseFloat(calories).toFixed(2)}
 </div>
        </div>
    
      </div>
      
    </div>
  );
}

export default Recipedisplay;