---
level: 3
---

# React 中，怎么实现父组件调用子组件中的方法？

## 参考答案

要实现父组件调用子组件中的方法，需要通过以下步骤进行操作：

1. 在子组件中，创建一个公开的方法。这可以通过在子组件类中定义一个方法或者使用 React Hooks 中的 `useImperativeHandle` 来实现。

   - 如果是类组件，可以在子组件类中定义一个方法，并将其挂载到实例上。例如：

     ```jsx
     class ChildComponent extends React.Component {
       childMethod() {
         // 子组件中需要执行的操作
       }

       render() {
         // 子组件的渲染逻辑
       }
     }
     ```

   - 如果是函数式组件，可以使用 `useImperativeHandle` Hook 将指定的方法暴露给父组件。例如：

     ```jsx
     import { forwardRef, useImperativeHandle } from 'react';

     function ChildComponent(props, ref) {
       useImperativeHandle(ref, () => ({
         childMethod() {
           // 子组件中需要执行的操作
         }
       }));

       // 子组件的渲染逻辑
     }

     export default forwardRef(ChildComponent);
     ```

2. 在父组件中，首先引用或创建对子组件的引用。可以使用 `ref` 对象来保存对子组件的引用。

   - 如果是类组件，可以使用 `createRef` 创建一个 `ref` 对象，并将其传递给子组件的 `ref` prop。例如：

     ```jsx
     class ParentComponent extends React.Component {
       constructor(props) {
         super(props);
         this.childRef = React.createRef();
       }

       handleClick() {
         // 调用子组件的方法
         this.childRef.current.childMethod();
       }

       render() {
         return (
           <div>
             <ChildComponent ref={this.childRef} />
             <button onClick={() => this.handleClick()}>调用子组件方法</button>
           </div>
         );
       }
     }
     ```

   - 如果是函数式组件，可以使用 `useRef` 创建一个 `ref` 对象，并将其传递给子组件的 `ref` prop。例如：

     ```jsx
     function ParentComponent() {
       const childRef = useRef(null);

       const handleClick = () => {
         // 调用子组件的方法
         childRef.current.childMethod();
       };

       return (
         <div>
           <ChildComponent ref={childRef} />
           <button onClick={handleClick}>调用子组件方法</button>
         </div>
       );
     }
     ```

通过以上步骤，父组件就能够成功调用子组件中暴露的方法了。请注意，在函数式组件中，需要使用 `forwardRef` 来包裹子组件，并通过 `ref` 参数来定义暴露的方法。
