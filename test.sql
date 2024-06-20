-- Create the function to insert data into the vendors table with SECURITY DEFINER
CREATE OR REPLACE FUNCTION insert_into_vendors()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.vendors(id, email, full_name, avatar)
  VALUES(
    NEW.id,
    NEW.raw_user_meta_data ->> 'email',
    COALESCE(NEW.raw_user_meta_data ->> 'user_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger to call the function on insert
CREATE TRIGGER trigger_insert_into_vendors
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION insert_into_vendors();


--  const handleCreatePost = async (data: NoteFormValues) => {
		
-- 		try {
-- 			setLoading(true);

			

-- 			const { data: post, error } = await supabase
-- 				.from("posts")
-- 				.insert([
-- 					{
-- 						title: data.title,
-- 						about: data.snippet,
-- 						profile_id: userId,
					
						
-- 					},
-- 				])
-- 				.select();

-- 			if (post) {
				
-- 				navigate("/posts");
		

-- 				toast.success("Article Published");
-- 			} else {
-- 				toast.error("Failed to create Post");
-- 			}
-- 		} catch (error: any) {
-- 			console.error("An error occurred:", error.message);
-- 		} finally {
-- 			setLoading(false);
-- 		}
--  };