import MyApisList from '@/components/myapis-list';

export default function MyApisPage() {
  return (
    <div className='py-8'>
      <div>
        <input type='text' id='title' name='title' placeholder='title' />
        <input type='text' id='content' name='content' placeholder='content' />
        <button type='submit'>새글 작성</button>
      </div>
      <MyApisList />
    </div>
  );
}
