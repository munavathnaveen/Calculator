let buttons=document.querySelectorAll("#btn");
let input=document.getElementById("screen");
let flag=false;
let string="";
//to check weather it is operator or number
function fun(e)
{
    const array=['+','-','*','%','/'];
    for(let i=0;i<5;i++)
    {
        if(array[i]===e)
        {
            return 1;
        }
    }
    return 0;
}
//to reverse the  string 
function reverse(s)
{
    let alter="";
    for(let i=s.length-1;i>=0;i--)
    {
        alter+=s[i];
    }
    return alter;
}
for(let btn of buttons)
{
    //event listener for each button
    btn.addEventListener("click", (e)=>{
        let current_value=e.target.value;
        //backspace
        if(current_value==="⌫")
        {
            if(string.length!=0)
            {
                string=string.slice(0,-1);
            }
            input.value=string;
        }
        //clear all 
        else if(current_value==='C')
        {
            string="";
            input.value=string;
        }
        else if(current_value==='+' || current_value==='*' || current_value==='/' || current_value==='%')
        {
            //to replace all the operators before the curent operator if exist
            while(fun(string[string.length-1]))
            {
                string=string.slice(0,-1);
            }
            if(string.length>0)
            {
                string+=current_value;
                input.value=string;
            }
        }
        else if(current_value==='-')
        {
            //to replace  + with - if exist
            if(string[string.length-1]==='+' || string[string.length-1]==='-' || string[string.length-1]==='%')
            {
                string=string.slice(0,-1);
                string+=current_value;
                input.value=string;
            }
            else
            {
                if(string.length>0)
                {
                    string+=current_value;
                    input.value=string;
                }
            }
        }
        else if(current_value==='=')
        {
            //following bodmos rule
            if(fun(string[string.length-1]))
            {
                string="Invalid expression";
                input.value=string;
            }
            // starting with modulo operator
            for(let i=0;i<string.length;i++)
            {
                if(string[i]==='%')
                {
                    let back="";
                    let front="";
                    let j=i-1;
                    let k=i+1;
                    let flag=false;
                    if(string[i+1]==='-')
                    {
                        k+=1;
                        flag=true;
                    }
                    while(!(fun(string[j])) && j>=0)
                    {
                        
                        back+=string[j];
                        j--;
                    }
                    while(k<string.length && !(fun(string[k])))
                    {
                        front+=string[k];
                        k++;
                    }
                    back= reverse(back);
                    back=Number(back);
                    front=Number(front);
                    if(flag==true)
                    {
                        front*=-1;
                    }
                    let s1=string.slice(0,j+1);
                    let s2=string.slice(k,string.length);
                    let result=back%front;
                    result=result.toString();
                    console.log(result);
                    string=s1+result+s2;
                    input.value=string;
                }
            }
            //next preority for division
            for(let i=0;i<string.length;i++)
            {
                if(string[i]==='/')
                {
                    let back="";
                    let front="";
                    let j=i-1;
                    let k=i+1;
                    let flag=false;
                    if(string[i+1]==='-')
                    {
                        k+=1;
                        flag=true;
                    }
                    while(!(fun(string[j])) && j>=0)
                    {
                        
                        back+=string[j];
                        j--;
                    }
                    while(k<string.length && !(fun(string[k])))
                    {
                        front+=string[k];
                        k++;
                    }
                    back= reverse(back);
                    back=Number(back);
                    front=Number(front);
                    if(flag==true)
                    {
                        front*=-1;
                    }
                    let s1=string.slice(0,j+1);
                    let s2=string.slice(k,string.length);
                    let result=back/front;
                    result=result.toString();
                    console.log(result);
                    string=s1+result+s2;
                    input.value=string;
                }
            }
            //next preority for multiplication 
            for(let i=0;i<string.length;i++)
            {
                if(string[i]==='*')
                {
                    let back="";
                    let front="";
                    let j=i-1;
                    let k=i+1;
                    let flag=false;
                    if(string[i+1]==='-')
                    {
                        k+=1;
                        flag=true;
                    }
                    while(!(fun(string[j])) && j>=0)
                    {
                        
                        back+=string[j];
                        j--;
                    }
                    while(k<string.length && !(fun(string[k])))
                    {
                        front+=string[k];
                        k++;
                    }
                    back= reverse(back);
                    back=Number(back);
                    front=Number(front);
                    if(flag==true)
                    {
                        front*=-1;
                    }
                    let s1=string.slice(0,j+1);
                    let s2=string.slice(k,string.length);
                    let result=back*front;
                    result=result.toString();
                    console.log(result);
                    string=s1+result+s2;
                    input.value=string;
                }
            }
            //now addition and substraction have same priority so calculate from left
            let su=0,negsu=0;
            let neg=false;
            let text="";
            for(let i=0;i<string.length;i++)
            {
                if(!fun(string[i]))
                {
                    text+=string[i];
                }
                else if(string[i]==='-')
                {
                    text=Number(text);
                    if(neg==false)
                    {
                        su+=text;
                    }
                    else
                    {
                        negsu+=text;
                    }
                    neg=true;
                    text="";
                }
                else
                {
                    text=Number(text);
                    if(neg==false)
                    {
                        su+=text;
                    }
                    else
                    {
                        negsu+=text;
                    }
                    neg=false;
                    text="";
                }

            }
            if(text!="")
            {
                text=Number(text);
                    if(neg==false)
                    {
                        su+=text;
                    }
                    else
                    {
                        negsu+=text;
                    }
                    neg=false;
                    text="";
            }
            let finalans=su-negsu;
            string=finalans.toString();
            input.value=string;
            string="";
        }
        else
        {
            string+=current_value;
            input.value=string;
        }
    })
}
