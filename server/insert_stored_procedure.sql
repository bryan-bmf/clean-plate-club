CREATE OR REPLACE PROCEDURE clean_plate_club.recipe_insert
(
	p_id		uuid,
	p_name		text,
	p_cuisine	text,
	p_time		text,
	p_protein	text,
	p_cooking_type	text,
	p_source		jsonb
) 
AS $$
BEGIN

	-- parameter validation
	if p_id is NULL then
		RAISE EXCEPTION 'id must have a value';
	end if;
	
	if p_name is NULL then
		RAISE EXCEPTION 'name must have a value';
	end if;
	
	if p_cuisine is NULL then
		RAISE EXCEPTION 'cuisine must have a value';
	end if;

	if p_time is NULL then
		RAISE EXCEPTION 'time must have a value';
	end if;

	if p_protein is NULL then
		RAISE EXCEPTION 'protein must have a value';
	end if;

	if p_cooking_type is NULL then
		RAISE EXCEPTION 'cooking type must have a value';
	end if;

	if p_source is NULL then
		RAISE EXCEPTION 'source must have a value';
	end if;

	insert into clean_plate_club.recipes(id, name, cuisine, time, protein, cooking_type)
	values(p_id, p_name, p_cuisine, p_time, p_protein, p_cooking_type);

	if p_source->'link' is NULL then
		insert into clean_plate_club.books(recipe_id, title, author, cover_image, page)
		values(p_id, p_source->>'title', p_source->>'author', p_source->>'cover_image', (p_source->'page')::int);
	else
		insert into clean_plate_club.media(recipe_id, media, image)
		values(p_id, p_source->>'link', p_source->>'image');
	end if;
	
END;
$$ LANGUAGE plpgsql;