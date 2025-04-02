// app/page.js
import Layout from './components/Layout';
import TodoEditor from './components/TodoEditor';
import CreateTodoButton from './components/CreateTodoButton';

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen">
        <TodoEditor />
      </div>
    </Layout>
  );
}