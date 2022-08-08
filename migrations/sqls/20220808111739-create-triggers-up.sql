CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.users (uid) VALUES (new.id);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY definer;

CREATE trigger on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
